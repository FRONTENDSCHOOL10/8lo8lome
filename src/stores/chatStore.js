import pb from '@/api/pb';
import { create } from 'zustand';
import { produce } from 'immer';

export const useChatStore = create((set) => {
  const INITIAL_STATE = {
    isLoggedIn: pb.authStore.isValid,
    chatRooms: [],
    noChatRoomsMessage: '',
    currentRoomMessages: {}, // 채팅방별 메시지 저장
  };

  pb.authStore.onChange(() => {
    set(
      produce((s) => {
        s.isLoggedIn = pb.authStore.isValid;
      })
    );
  });

  const fetchChatRooms = async () => {
    if (!pb.authStore.isValid) {
      return;
    }

    try {
      const userId = pb.authStore.model.id;
      const chatRooms = await pb.collection('chatRooms').getFullList({
        filter: `participants~ "${userId}"`,
        sort: '-created',
      });

      set(
        produce((s) => {
          s.chatRooms = chatRooms;
          if (chatRooms.length === 0) {
            s.noChatRoomsMessage = '참여 중인 채팅방이 없습니다.';
          }
        })
      );
    } catch (error) {
      console.error('Failed to fetch chatrooms:', error);
    }
  };

  const createChatRoom = async (participants, onSuccess) => {
    if (!pb.authStore.isValid) {
      return;
    }

    try {
      const gymId = 'ijt4sbokd8dlz19'; // 고정된 헬스장 ID
      const userId = pb.authStore.model.id;

      // 기존 채팅방 확인
      const existingRooms = await pb.collection('chatRooms').getFullList({
        filter: `participants~"${userId}" && participants~"${gymId}"`,
      });

      if (existingRooms.length > 0) {
        onSuccess(existingRooms[0].id); // 기존 채팅방으로 이동
        return;
      }

      // 중복되지 않도록 참가자 배열 생성
      const uniqueParticipants = [...new Set([...participants, gymId])];

      const newRoom = await pb.collection('chatRooms').create({
        participants: uniqueParticipants,
        name: '헬스장 채팅방',
        lastMessage: '',
        unreadCount: 0,
      });

      console.log('New Chat Room Created:', newRoom);

      onSuccess(newRoom.id); // 새 채팅방으로 이동

      await fetchChatRooms();
    } catch (error) {
      console.error('Failed to create chat room:', error);
    }
  };

  const sendMessage = async (roomId, senderId, content) => {
    if (!pb.authStore.isValid) {
      return;
    }

    try {
      const newMessage = await pb.collection('messages').create({
        roomId,
        senderId,
        content,
        timestamp: new Date().toISOString(),
      });
      console.log('Message Sent:', newMessage);

      await fetchMessages(roomId);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const fetchMessages = async (roomId) => {
    if (!pb.authStore.isValid) {
      return;
    }

    try {
      const messages = await pb.collection('messages').getFullList({
        filter: `roomId="${roomId}"`,
      });
      set(
        produce((s) => {
          s.currentRoomMessages[roomId] = messages;
        })
      );
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const updateChatRoom = async (roomId, updates) => {
    if (!pb.authStore.isValid) {
      return;
    }

    try {
      await pb.collection('chatRooms').update(roomId, updates);
      console.log('Chat Room Updated:', updates);

      await fetchChatRooms();
    } catch (error) {
      console.error('Failed to update chat room:', error);
    }
  };

  const setIsLoggedIn = (isLoggedIn) => {
    set(
      produce((s) => {
        s.isLoggedIn = isLoggedIn;
      })
    );
  };

  return {
    ...INITIAL_STATE,
    setIsLoggedIn,
    fetchChatRooms,
    createChatRoom,
    sendMessage,
    fetchMessages,
    updateChatRoom,
  };
});
