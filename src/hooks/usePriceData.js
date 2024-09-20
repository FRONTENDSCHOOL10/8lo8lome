// hooks/usePricingData.js
import { useEffect, useState } from 'react';
import { mainStore } from '@/stores/mainStore';

const usePricingData = () => {
  const [pricingItems, setPricingItems] = useState([]);
  const [additionalItems, setAdditionalItems] = useState([]);
  const [ptItems, setPtItems] = useState([]);

  useEffect(() => {
    const { healthPrice, PtPrice } = mainStore.getState().searchInput.gymData;

    setPricingItems([
      { key: '1day', label: '1일권', price: healthPrice['1day'] },
      { key: '1Month', label: '1개월', price: healthPrice['1Month'] },
      { key: '3Months', label: '3개월', price: healthPrice['3Months'] },
      { key: '6Months', label: '6개월', price: healthPrice['6Months'] },
      { key: '12Months', label: '12개월', price: healthPrice['12Months'] },
    ]);

    setAdditionalItems([
      {
        key: 'workoutClothes',
        label: '운동복',
        price: healthPrice['workoutClothes'],
      },
      {
        key: 'personalLocker',
        label: '개인락커',
        price: healthPrice['personalLocker'],
      },
    ]);

    setPtItems([
      { key: '10Sessions', label: '10회권', price: PtPrice['10Sessions'] },
      { key: '20Sessions', label: '20회권', price: PtPrice['20Sessions'] },
      { key: '30Sessions', label: '30회권', price: PtPrice['30Sessions'] },
      {
        key: 'singleSession',
        label: '1회 체험권',
        price: PtPrice['singleSession'],
      },
    ]);
  }, []);

  return { pricingItems, additionalItems, ptItems };
};

export default usePricingData;
