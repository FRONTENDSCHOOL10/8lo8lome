import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';

function PriceList() {
  const { gymData } = mainStore((s) => ({
    gymData: s.searchInput.gymData,
  }));

  const gymPriceName = {
    '1일권': '1day',
    '1개월': '1month',
    '3개월': '3months',
    '6개월': '6months',
    '12개월': '12months',
    운동복: 'workoutClothes',
    개인락커: 'personalLocker',
  };

  const ptPriceName = {
    '1일 체험권': '1session',
    '5회': '5sessions',
    '10회': '10sessions',
  };

  const isPriceAllNull = (priceType) => {
    return Object.values(gymData.price[priceType]).every(
      (value) => value === null
    );
  };

  const getPriceLabel = (priceType, value, trueValue, falseValue) => {
    return gymData.price[priceType][value] === '무료' ? trueValue : falseValue;
  };

  return (
    <section className="mx-s31">
      <h3 className="text-f18 font-bold mb-s10">가격</h3>

      <ul className="flex flex-col gap-6 bg-subBg rounded px-s14 py-s14">
        {isPriceAllNull('gymPrice') ? null : (
          <li>
            <ul className="text-f18 font-bold flex flex-col gap-s18">
              헬스장
              {Object.entries(gymPriceName).map(([key, value]) => {
                if (gymData.price.gymPrice[value]) {
                  const priceLabel = getPriceLabel('gymPrice', value, '', '원');

                  return (
                    <li
                      key={key}
                      className="text-f16 font-bold flex justify-between"
                    >
                      <p>{key}</p>
                      <p>
                        {getPriceLabel(
                          'gymPrice',
                          value,
                          gymData.price.gymPrice[value],
                          Number(gymData.price.gymPrice[value]).toLocaleString()
                        )}
                        {priceLabel}
                      </p>
                    </li>
                  );
                }
              })}
            </ul>
          </li>
        )}

        {isPriceAllNull('ptPrice') ? null : (
          <li>
            <ul className="text-f18 font-bold flex flex-col gap-s18">
              PT
              {Object.entries(ptPriceName).map(([key, value]) => {
                if (gymData.price.ptPrice[value]) {
                  const priceLabel = getPriceLabel('gymPrice', value, '', '원');

                  return (
                    <li
                      key={key}
                      className="text-f16 font-bold flex justify-between"
                    >
                      <p>{key}</p>
                      <p>
                        {getPriceLabel(
                          'ptPrice',
                          value,
                          gymData.price.ptPrice[value],
                          Number(gymData.price.ptPrice[value]).toLocaleString()
                        )}
                        {priceLabel}
                      </p>
                    </li>
                  );
                }
              })}
            </ul>
          </li>
        )}
      </ul>
    </section>
  );
}

export default memo(PriceList);
