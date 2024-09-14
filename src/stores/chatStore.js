import { create } from 'zustand';
import { produce } from 'immer';
import pb from '@/api/pb';
import { createData, deleteData, getData, updateData } from '@/api/CRUD';

export const useChatStore = create((set) => {
  const INITIAL_STATE = {
    isLoggedIn: pb.authStore.isValid,
    userId: pb.authStore.model?.id || '',
    chatRooms: [], // 채팅방 목록
    currentRoomMessages: {}, // 현재 채팅방의 메시지들
    newMessage: '', // 새 메시지 입력값
    ownerGymId: '', //  헬스장 owner인지 확인한 후 헬스장 ID 저장
    ownerGymName: '', // 헬스장 이름
  };

  pb.authStore.onChange(() => {
    set(
      produce((draft) => {
        draft.isLoggedIn = pb.authStore.isValid;
        draft.userId = pb.authStore.model?.id || '';
      })
    );
  });

  // 상태 가져오는 헬퍼 함수
  const getState = () => useChatStore.getState();

  const setGymOwner = async () => {
    const { userId, isLoggedIn } = getState();
    if (!isLoggedIn) return;

    // 로그인한 사용자의 정보를 가져옵니다.
    const user = await getData('users', userId);

    // 사용자가 `isGymOwner`인지 확인합니다.
    if (user.isGymOwner) {
      // `ownerId`를 사용하여 헬스장 정보를 가져옵니다.
      const gym = await getData('gyms', user.ownerId);
      // 상태를 업데이트합니다.
      set(
        produce((draft) => {
          draft.ownerGymId = user.ownerId;
          draft.ownerGymName = gym.name;
        })
      );
      console.log('헬스장 계정입니다.');
    } else {
      console.log('일반 계정입니다.');
    }
  };

  // 채팅방 목록을 가져오는 함수
  const getChatRoomList = async () => {
    const { isLoggedIn, userId, ownerGymId } = getState();
    if (!isLoggedIn) return;

    let filterCondition;
    // owner가 true라면 gymId가 owner.ownerId인 채팅방을 가져옴
    if (ownerGymId) {
      filterCondition = `gymId="${ownerGymId}"`;
    } else {
      // owner가 false인 경우, 현재 로그인한 사용자의 채팅방을 가져옴
      filterCondition = `userId="${userId}"`;
    }

    try {
      // 필터링된 채팅방 목록 가져오기
      const chatRooms = await pb.collection('chatRooms').getFullList({
        filter: filterCondition,
        sort: '-lastTime',
      });
      set(
        produce((draft) => {
          draft.chatRooms = chatRooms;
        })
      );
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
    }
  };

  // 채팅방을 생성하는 함수
  const createChatRoom = async (gymId, onSuccess) => {
    const { isLoggedIn, userId, chatRooms } = getState();
    if (!isLoggedIn) return;

    try {
      // 기존 채팅방을 userId와 gymId 모두로 확인
      // 기존 채팅방을 gymId로 확인
      const existingChatRoom = chatRooms.find((room) => room.gymId === gymId);
      if (existingChatRoom) {
        // 이미 해당 gymId와 관련된 채팅방이 존재하면, 그 채팅방 정보를 사용
        onSuccess(existingChatRoom.id);
        await getChatRoomList();
        return;
      }

      // 채팅방이 존재하지 않으면 새로운 채팅방을 생성
      const gymData = await getData('gyms', gymId);
      const newChatRoomData = {
        userId,
        gymId,
        name: gymData.name,
        lastMessage: '아직 시작한 대화가 없습니다.',
        unreadCount: 0,
        lastTime: null, // 생성된 시간 추가
      };
      const newChatRoom = await createData('chatRooms', newChatRoomData);
      onSuccess(newChatRoom.id);
      set(
        produce((draft) => {
          draft.chatRooms.push({
            id: newChatRoom.id,
            gymId: gymId,
            name: gymData.name,
            lastMessage: newChatRoomData.lastMessage,
            unreadCount: newChatRoomData.unreadCount,
            lastTime: newChatRoomData.lastTime,
          });
          draft.gymName = gymData.name;
        })
      );
    } catch (error) {
      console.error('createChatRoom - Error:', error);
    }
  };

  // 새 메시지 입력값 상태 업데이트
  const getNewMessage = (value) => {
    set(
      produce((draft) => {
        draft.newMessage = value;
      })
    );
  };

  // 메시지 전송 함수
  const sendMessage = async (roomId) => {
    const { isLoggedIn, newMessage, userId } = getState();
    if (!isLoggedIn) return;

    const currentTime = new Date().toISOString();
    // 메시지 데이터 설정
    const data = {
      roomId,
      senderId: userId,
      content: newMessage,
      timestamp: currentTime, // 생성된 시간 추가
    };

    // 메시지 저장
    await createData('messages', data);
    // 채팅방 메시지 새로 가져오기
    await getChatMessages(roomId);
    // 채팅방의 마지막 메시지 업데이트
    await updateChatRoom(roomId, {
      lastMessage: newMessage,
      lastTime: currentTime,
    });
  };

  // 채팅방의 메시지를 가져오는 함수
  const getChatMessages = async (roomId) => {
    const { isLoggedIn } = getState();
    if (!isLoggedIn) return; // 로그인하지 않았으면 반환

    // 메시지 목록 가져오기
    const messages = await pb.collection('messages').getFullList({
      filter: `roomId="${roomId}"`,
    });

    set(
      produce((s) => {
        // 메시지가 없는 경우 빈 배열로 처리
        s.currentRoomMessages[roomId] = messages.length > 0 ? messages : [];
      })
    );
  };

  // 채팅방 정보 업데이트 함수
  const updateChatRoom = async (roomId, data) => {
    const { isLoggedIn } = getState();
    if (!isLoggedIn) return; // 로그인하지 않았으면 반환

    // 채팅방 정보 업데이트를 위한 데이터 객체

    try {
      await updateData('chatRooms', roomId, data);
      // 상태를 최신으로 업데이트
      set(
        produce((s) => {
          s.lastMessage = data.newMessage;
          s.lastTime = data.lastTime;
        })
      );
    } catch (error) {
      console.error('Error updating chat room:', error);
    }
  };

  const deleteChatRoom = async (roomId) => {
    try {
      await deleteData('chatRooms', roomId);
      // 상태에서 채팅방 제거
      set(
        produce((draft) => {
          draft.chatRooms = draft.chatRooms.filter(
            (room) => room.id !== roomId
          );
        })
      );
    } catch (error) {
      console.error('Error removing chat room:', error);
    }
  };

  // 상태와 API 호출 함수 반환
  return {
    ...INITIAL_STATE,
    getChatRoomList,
    createChatRoom,
    sendMessage,
    setGymOwner,
    getChatMessages,
    updateChatRoom,
    getNewMessage,
    deleteChatRoom,
  };
});
