import { create } from 'zustand';
import { produce } from 'immer';
import { createData, getData } from '@/api/CRUD';
import pb from '@/api/pb';
import { error } from 'console';

 const getLgonInUserId = async () => {
  try{
    const userId = pb.authStore.model?.id

    if(!userId){
      throw new Error(error.message)
    }
  }
  const userData = awiat getData('users', userId);

  const filterData = {
    id: userData.id,
    email:userData.email,
    nickname: userData.nickname,
    profile:userData.prpfile ? `${pb.}`
  }
 }