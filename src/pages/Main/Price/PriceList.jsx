import { memo } from 'react';
import { array, bool } from 'prop-types';
import { usePriceListStore } from '@/stores/priceListStore';

PriceList.propTypes = {
  data: array.isRequired,
  health: bool,
};

function PriceList({ data, health }) {
  const { selectedPricing, handleCheckPricing } = usePriceListStore((s) => ({
    selectedPricing: s.selectedPricing,
    handleCheckPricing: s.handleCheckPricing,
  }));
  const name = health ? 'health' : 'pt';

  const handleRadioChange = (key) => {
    const selectedItem = data.find((item) => item.key === key);
    if (selectedItem) {
      handleCheckPricing(name, key, selectedItem.price);
    }
  };

  const selectedItem = selectedPricing[name];

  return (
    <article className={health ? '' : 'mb-[80px]'}>
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
            type="checkbox"
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
    </article>
  );
}

export default memo(PriceList);
