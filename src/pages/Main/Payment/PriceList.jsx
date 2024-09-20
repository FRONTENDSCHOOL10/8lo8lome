import { memo } from 'react';
import { array, bool } from 'prop-types';
import { useState } from 'react';

PriceList.propTypes = {
  data: array.isRequired,
  health: bool,
};

function PriceList({ data, health }) {
  const [selectedPricing, setSelectedPricing] = useState(null);

  const handleChange = (key) => {
    setSelectedPricing(key);
  };

  const name = health ? 'health' : 'pt';

  return (
    <article>
      {data.map((item) => (
        <label
          key={item.key}
          className={`bg-subBg p-[20px] flex flex-col gap-2 border border-solid mb-4 cursor-pointer ${
            selectedPricing === item.key
              ? 'border-mainColor'
              : 'border-transparent '
          }`}
        >
          <input
            type="radio"
            name={name}
            value={item.key}
            className="absolute opacity-0 cursor-pointer"
            onChange={() => handleChange(item.key)}
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
