import { create } from 'zustand';
import produce from 'immer';
import pb from 'path_to_pocketbase_instance'; // adjust the path

export const useMyCouponStore = create((set) => ({
  couponData: {
    paymentHistory: [],
    remainingDays: null,
  },

  fetchPaymentHistory: async (userId) => {
    try {
      const user = await pb.collection('users').getOne(userId);
      const paymentHistory = user.paymentHistory;

      // Calculate remaining days based on endDate
      const today = new Date();
      const endDate = new Date(paymentHistory[0]?.endDate);
      const remainingDays = Math.floor(
        (endDate - today) / (1000 * 60 * 60 * 24)
      ); // Convert ms to days

      set(
        produce((draft) => {
          draft.couponData.paymentHistory = paymentHistory;
          draft.couponData.remainingDays =
            remainingDays > 0 ? remainingDays : 0;
        })
      );
    } catch (error) {
      console.error('Error fetching payment history:', error);
    }
  },
}));
