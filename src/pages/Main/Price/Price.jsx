import {
  AppHeader,
  AppCheckboxInput,
  AppAccordion,
  AppMeta,
  AppStatusPage,
} from '@/components';
import { memo, useState } from 'react';
import PriceList from './PriceList';
import usePriceData from '@/hooks/usePriceData';
import { usePriceListStore } from '@/stores/priceListStore';
import { useParams } from 'react-router-dom';
function Price() {
  const {
    handleToggle,
    selectedItems,
    totalPrices,
    isClothesAndLocker,
    submitPayment,
    isPayment,
  } = usePriceListStore((s) => ({
    handleToggle: s.handleToggle,
    selectedItems: s.selectedItems,
    totalPrices: s.totalPrices,
    isClothesAndLocker: s.isClothesAndLocker,
    submitPayment: s.submitPayment,
    isPayment: s.isPayment,
  }));

  const { gymId } = useParams();

  const [openHealthAccordion, setOpenHealthAccordion] = useState(true);
  const [openPtAccordion, setOpenPtAccordion] = useState(false);
  const { pricingItems, additionalItems, ptItems } = usePriceData();
  const toggleHealthAccordion = () => {
    setOpenHealthAccordion((prev) => !prev);
  };
  const togglePtAccordion = () => {
    setOpenPtAccordion((prev) => !prev);
  };

  const totalSum = isClothesAndLocker
    ? Object.values(totalPrices).reduce((acc, curr) => acc + curr, 0)
    : 0;

  const submitPaymentButton = () => {
    submitPayment(gymId);
  };

  if (isPayment) {
    return <AppStatusPage status="payment" />;
  }

  const buttonClassName =
    totalSum === 0
      ? 'border border-solid text-mainColor border-mainColor bg-mainBg cursor-not-allowed '
      : 'bg-mainColor cursor-pointer border-transparent';

  return (
    <>
      <AppMeta title={`결제 페이지`} description={`결제 페이지입니다.`} />
      <AppHeader>가격 정보</AppHeader>
      <main className="mt-[100px] px-[1.25rem]">
        <AppAccordion
          title="가격 정보"
          isOpen={openHealthAccordion}
          toggleAccordion={toggleHealthAccordion}
        >
          <PriceList data={pricingItems} health />
        </AppAccordion>
        <AppAccordion
          title="PT 가격 정보"
          isOpen={openPtAccordion}
          toggleAccordion={togglePtAccordion}
        >
          <PriceList data={ptItems} />
        </AppAccordion>
        {isClothesAndLocker && (
          <div className="flex flex-col gap-2 mb-[80px]">
            {additionalItems.map((additionalItem) => {
              const isFree = additionalItem.price === '무료';
              const priceLabel = isFree
                ? `${additionalItem.label}: 무료`
                : `${additionalItem.label}: 월 ${additionalItem.price.toLocaleString()}원`;
              return (
                <AppCheckboxInput
                  key={additionalItem.key}
                  label={priceLabel}
                  name={`${additionalItem.label}`}
                  unCheckedSvgId="checkbox-unclick"
                  onChange={handleToggle}
                  className="justify-between text-f16"
                  isChecked={!!selectedItems[`${additionalItem.label}`]}
                  reverse
                />
              );
            })}
          </div>
        )}
        <button
          type="button"
          className={`flex items-center justify-center py-s14 text-f12 rounded w-[calc(100%-2.5rem)] font-bold text-black fixed z-10 bottom-[20px] left-1/2 -translate-x-1/2 ${buttonClassName}`}
          onClick={submitPaymentButton}
        >
          {totalSum.toLocaleString()}원 결제하기
        </button>
      </main>
    </>
  );
}

export default memo(Price);
