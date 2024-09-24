import { memo } from 'react';
import { string, number, bool, shape, arrayOf } from 'prop-types';
import { usePriceListStore } from '@/stores/priceListStore';
import { useEffect } from 'react';

PriceList.propTypes = {
  data: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
      price: number.isRequired,
    })
  ).isRequired,
  health: bool,
};

function PriceList({ data, health }) {
  const {
    selectedPricing,
    handleCheckPricing,
    isClothesAndLocker,
    getPaymentHistory,
  } = usePriceListStore((s) => ({
    selectedPricing: s.selectedPricing,
    handleCheckPricing: s.handleCheckPricing,
    isClothesAndLocker: s.isClothesAndLocker,
    getPaymentHistory: s.getPaymentHistory,
  }));

  useEffect(() => {
    getPaymentHistory();
  }, [getPaymentHistory]);

  const name = health ? 'health' : 'pt';

  const handleRadioChange = (key) => {
    const selectedItem = data.find((item) => item.key === key);
    if (selectedItem) {
      handleCheckPricing(name, key, selectedItem.price);
    }
  };

  const selectedItem = selectedPricing[name];

  return (
    <fieldset
      className={health ? '' : isClothesAndLocker ? 'mb-[30px]' : 'mb-[80px]'}
    >
      <legend className="sr-only">
        {health ? '헬스장 이용권 선택' : 'PT 이용권 선택'}
      </legend>
      {data.map((item) => (
        <label
          key={item.key}
          className={`bg-subBg p-[20px] flex flex-col gap-2 border border-solid mb-4 cursor-pointer ${
            selectedItem === item.key
              ? 'border-mainColor'
              : 'border-transparent'
          }`}
        >
          <input
            type="radio"
            name={name}
            value={item.key}
            className="absolute opacity-0 cursor-pointer"
            checked={selectedItem === item.key}
            onChange={() => handleRadioChange(item.key)}
          />
          <div className="flex">
            <p className="text-white">{item.label}</p>
            {(item.key === '30Sessions' ||
              item.key === '6Months' ||
              item.key === '12Months') && (
              <span className="text-mainColor ml-[5px]">BEST</span>
            )}
          </div>
          <p className="text-end">
            가격 :{' '}
            <span className="text-mainColor">
              {item.price.toLocaleString()}원
            </span>
          </p>
        </label>
      ))}
    </fieldset>
  );
}

export default memo(PriceList);
