import {
  AppHeader,
  AppCheckboxInput,
  AppAccordion,
  AppMeta,
} from '@/components';
import { memo, useState } from 'react';
import PriceList from './PriceList';
import { Link } from 'react-router-dom';
import usePriceData from '@/hooks/usePriceData';
import { usePriceListStore } from '@/stores/priceListStore';
function Price() {
  const { handleToggle, selectedItems, totalPrices } = usePriceListStore(
    (s) => ({
      handleToggle: s.handleToggle,
      selectedItems: s.selectedItems,
      totalPrices: s.totalPrices,
    })
  );

  const [openHealthAccordion, setOpenHealthAccordion] = useState(true);
  const [openPtAccordion, setopenPtAccordion] = useState(false);
  const { pricingItems, additionalItems, ptItems } = usePriceData();
  const toggleHealthAccordion = () => {
    setOpenHealthAccordion((prev) => !prev);
  };
  const togglePtAccordion = () => {
    setopenPtAccordion((prev) => !prev);
  };

  const totalSum = Object.values(totalPrices).reduce(
    (acc, curr) => acc + curr,
    0
  );

  return (
    <>
      <AppMeta title={`결제 페이지`} description={`결제 페이지입니다.`} />
      <AppHeader>가격 정보</AppHeader>
      <main className="mt-[100px] px-[1.25rem]">
        <div>
          <AppAccordion
            title="가격 정보"
            isOpen={openHealthAccordion}
            toggleAccordion={toggleHealthAccordion}
          >
            {openHealthAccordion && <PriceList data={pricingItems} health />}
          </AppAccordion>
        </div>
        <div>
          <AppAccordion
            title="PT 가격 정보"
            isOpen={openPtAccordion}
            toggleAccordion={togglePtAccordion}
          >
            {openPtAccordion && <PriceList data={ptItems} />}
          </AppAccordion>
        </div>
        {/* {additionalItems.map((additionalItem) => {
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
              price
            />
          );
        })} */}
        <Link
          to="/payment"
          className={`flex items-center justify-center py-s14 text-f12 rounded w-full font-bold bg-mainColor text-black ${totalSum === 0 && 'pointer-events-none opacity-80'}`}
        >
          {totalSum.toLocaleString()}원 결제하기
        </Link>
      </main>
    </>
  );
}

export default memo(Price);
