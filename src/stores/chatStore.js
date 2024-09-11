import { create } from 'zustand';
import { produce } from 'immer';
import pb from '@/api/pb';
import { createData, getData, getFirstListItem, updateData } from '@/api/CRUD';

// Zustand 스토어 생성
export const useChatStore = create((set) => {
  // 상태의 초기값 설정
  const INITIAL_STATE = {
    isLoggedIn: pb.authStore.isValid,
    userId: pb.authStore.model?.id || '',
    chatRooms: [], // 채팅방 목록
    currentRoomMessages: {}, // 현재 채팅방의 메시지들
    newMessage: '', // 새 메시지 입력값
    gymId: '', //  헬스장 owner인지 확인한 후 헬스장 ID 저장
    gymName: '', // 헬스장 이름
  };

  // 인증 상태 변경 시 상태 업데이트
  pb.authStore.onChange(() => {
    set(
      produce((draft) => {
        draft.isLoggedIn = pb.authStore.isValid; // 로그인 상태 업데이트
        draft.userId = pb.authStore.model?.id || ''; // 사용자 ID 업데이트
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
          draft.gymId = user.ownerId;
          draft.gymName = gym.name;
        })
      );
      console.log('헬스장 계정입니다.');
    } else {
      console.log('일반 계정입니다.');
    }
  };

  // 채팅방 목록을 가져오는 함수
  const getChatRoomList = async () => {
    const { isLoggedIn, userId, gymId } = getState();
    if (!isLoggedIn) return;

    let filterCondition;
    // owner가 true라면 gymId가 owner.ownerId인 채팅방을 가져옴
    if (gymId) {
      filterCondition = `gymId="${gymId}"`;
    } else {
      // owner가 false인 경우, 현재 로그인한 사용자의 채팅방을 가져옴
      filterCondition = `userId="${userId}"`;
    }

    try {
      // 필터링된 채팅방 목록 가져오기
      const chatRooms = await pb.collection('chatRooms').getFullList({
        filter: filterCondition,
        sort: '-created',
      });

      set(
        produce((draft) => {
          const existingIds = new Set(draft.chatRooms.map((room) => room.id));
          draft.chatRooms = [
            ...draft.chatRooms,
            ...chatRooms.filter((room) => !existingIds.has(room.id)),
          ];
        })
      );
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
    }
  };

  // 채팅방을 생성하는 함수
  const createChatRoom = async (gymId, onSuccess) => {
    const { isLoggedIn, userId } = getState();
    if (!isLoggedIn) return;

    try {
      // 기존 채팅방을 userId와 gymId 모두로 확인
      const existingChatRoomByUser = await getFirstListItem(
        'chatRooms',
        'gymId',
        gymId
      );
      if (existingChatRoomByUser.gymId === gymId) {
        // 이미 해당 gymId와 관련된 채팅방이 존재하면, 그 채팅방 정보를 사용
        onSuccess(existingChatRoomByUser.id);
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
      };
      const newChatRoom = await createData('chatRooms', newChatRoomData);
      onSuccess(newChatRoom.id);
      set(
        produce((draft) => {
          draft.isLoading = true;
          draft.gymName = gymData.name;
          draft.gymId = gymId;
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

  // // 메시지 전송 함수
  const sendMessage = async (roomId) => {
    const { isLoggedIn, newMessage, userId } = getState();
    if (!isLoggedIn) return;
    // 메시지 데이터 설정
    const data = {
      roomId,
      senderId: userId,
      content: newMessage,
      timestamp: new Date().toLocaleDateString('en-US', {
        month: 'numeric',
        weekday: 'short',
      }),
    };

    // 메시지 저장
    await createData('messages', data);
    // 채팅방 메시지 새로 가져오기
    await getChatMessages(roomId);
    // 채팅방의 마지막 메시지 업데이트
    await updateChatRoom(roomId, newMessage);
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
  const updateChatRoom = async (roomId, newMessage) => {
    const { isLoggedIn } = getState();
    if (!isLoggedIn) return; // 로그인하지 않았으면 반환

    // 채팅방 정보 업데이트를 위한 데이터 객체
    const data = {
      lastMessage: newMessage, // 마지막 메시지 필드 업데이트
    };

    try {
      await updateData('chatRooms', roomId, data);
      // 상태를 최신으로 업데이트
      set(
        produce((s) => {
          s.lastMessage = newMessage;
        })
      );
    } catch (error) {
      console.error('Error updating chat room:', error);
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
  };
});
