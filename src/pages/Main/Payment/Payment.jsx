import {
  AppHeader,
  AppCheckboxInput,
  AppAccordion,
  AppMeta,
  AppLoading,
} from '@/components';
import { memo, useState } from 'react';
import { mainStore } from '@/stores/mainStore';
import { usePaymentStore } from '@/stores/paymentStore';
import PriceList from './PriceList';
import { useEffect } from 'react';

function Payment() {
  const { gymData } = mainStore((s) => ({
    gymData: s.searchInput.gymData,
  }));

  const { handleToggle, selectedItems } = usePaymentStore((s) => ({
    handleToggle: s.handleToggle,
    selectedItems: s.selectedItems,
  }));

  const [openHealthAccordion, setOpenHealthAccordion] = useState(false);
  const [openPtAccordion, setopenPtAccordion] = useState(false);

  const { healthPrice, PtPrice } = gymData;

  const pricingItems = [
    { key: '1day', label: '1일권', price: healthPrice['1day'] },
    { key: '1Month', label: '1개월', price: healthPrice['1Month'] },
    { key: '3Months', label: '3개월', price: healthPrice['3Months'] },
    { key: '6Months', label: '6개월', price: healthPrice['6Months'] },
    { key: '12Months', label: '12개월', price: healthPrice['12Months'] },
  ];

  const additionalItems = [
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
  ];

  const ptItems = [
    { key: '10Sessions', label: '10회권', price: PtPrice['10Sessions'] },
    { key: '20Sessions', label: '20회권', price: PtPrice['20Sessions'] },
    { key: '30Sessions', label: '30회권', price: PtPrice['30Sessions'] },
    {
      key: 'singleSession',
      label: '1회 체험권',
      price: PtPrice['singleSession'],
    },
  ];

  const toggleHealthAccordion = () => {
    setOpenHealthAccordion((prev) => !prev);
  };
  const togglePtAccordion = () => {
    setopenPtAccordion((prev) => !prev);
  };

  return (
    <>
      <AppMeta
        title={`${gymData.name} 결제 페이지`}
        description={`${gymData.name} 결제 페이지입니다.`}
      />
      <AppHeader>{gymData.name}</AppHeader>
      <main className="mt-[100px] px-[1.25rem]">
        <div>
          <AppAccordion
            title="가격 정보"
            isOpen={openHealthAccordion}
            toggleAccordion={toggleHealthAccordion}
          >
            {openHealthAccordion && (
              // <article>
              //   {pricingItems.map((item) => (
              //     <label
              //       key={item.key}
              //       className={`bg-subBg p-[20px] flex flex-col gap-2 border border-solid border-red-500 mb-4 cursor-pointer ${selectedPricing === item.key ? 'ring-2 ring-mainColor' : ''}`}
              //     >
              //       <input
              //         type="radio"
              //         name="pricing"
              //         value={item.key}
              //         checked={selectedPricing === item.key}
              //         onChange={() => setSelectedPricing(item.key)}
              //         className="absolute opacity-0 cursor-pointer"
              //       />
              //       <div className="flex">
              //         <p className="text-white">{item.label}</p>
              //         {(item.key === '6Months' || item.key === '12Months') && (
              //           <span className="text-mainColor ml-[5px]">BEST</span>
              //         )}
              //       </div>
              //
              //       <p>기본 가격 : {item.price.toLocaleString()}원</p>
              //       <p className="text-end">
              //         결제 총액 :{' '}
              //         <span className="text-red-500">
              //           {item.price.toLocaleString()}원
              //         </span>
              //       </p>
              //     </label>
              //   ))}
              // </article>
              <PriceList data={pricingItems} />
            )}
          </AppAccordion>
        </div>
        <div>
          <AppAccordion
            title="PT 가격 정보"
            isOpen={openPtAccordion}
            toggleAccordion={togglePtAccordion}
          >
            {openPtAccordion && <PriceList data={ptItems} bool />}
          </AppAccordion>
        </div>
        {additionalItems.map((additionalItem) => {
          const isFree = additionalItem.price === 0;
          const priceLabel = isFree
            ? `${additionalItem.label}: 무료`
            : `${additionalItem.label}: ${additionalItem.price.toLocaleString()}원`;
          return (
            <AppCheckboxInput
              key={additionalItem.key}
              label={priceLabel}
              name={`${additionalItem.label}`}
              unCheckedSvgId="checkbox-unclick"
              onChange={handleToggle}
              className="justify-between"
              isChecked={!!selectedItems[`${additionalItem.label}`]}
              payment
            />
          );
        })}
      </main>
    </>
  );
}

export default memo(Payment);
