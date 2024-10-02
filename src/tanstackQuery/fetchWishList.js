import { produce } from 'immer'; // immer 임포트
import { getData } from '@/api/CRUD';
import { mainStore } from '@/stores/mainStore';

export const fetchWishList = async () => {
  const { wishList } = mainStore.getState().searchInput;

  // 이미 wishList가 있다면 추가 요청을 하지 않음
  if (wishList.length > 0) {
    console.log('이미 불러온 wishList 사용');
    produce((draft) => {
      draft.searchInput.isWishListLoaded = true;
    });
    return wishList; // wishList 반환
  }

  try {
    const userId = mainStore.getState().userId;
    const userData = await getData('users', userId);
    const wishList = userData.wishList || [];

    mainStore.setState(
      produce((draft) => {
        draft.searchInput.wishList = wishList;
        draft.searchInput.isWishListLoaded = true;
        wishList.forEach((gym) => {
          draft.searchInput.wishListChecked[gym.name] = true;
        });
      })
    );

    return wishList;
  } catch (error) {
    console.error('유저 wishList 가져오기 실패:', error);
    throw error;
  }
};
