import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';

function PriceList() {
  const { gymData } = mainStore((s) => ({
    gymData: s.searchInput.gymData,
  }));

  const healthPriceName = {
    '1일권': '1day',
    '1개월': '1Month',
    '3개월': '3Months',
    '6개월': '6Months',
    '12개월': '12Months',
    운동복: 'workoutClothes',
    개인락커: 'personalLocker',
  };

  const ptPriceName = {
    '1일 체험권': 'singleSession',
    '10회': '10Sessions',
    '20회': '20Sessions',
    '30회': '30Sessions',
  };

  const isPriceAllNull = (priceType) => {
    return Object.values(gymData[priceType]).every((value) => value === null);
  };

  const getPriceLabel = (priceType, value, trueValue, falseValue) => {
    return gymData[priceType][value] === '무료' ? trueValue : falseValue;
  };

  return (
    <section className="mx-s31">
      <h3 className="text-f18 font-bold mb-s10">가격</h3>

      <ul className="flex flex-col gap-6 bg-subBg rounded px-s14 py-s14">
        {isPriceAllNull('healthPrice') ? null : (
          <li>
            <ul className="text-f18 font-bold flex flex-col gap-s18">
              헬스장
              {Object.entries(healthPriceName).map(([key, value]) => {
                if (gymData.healthPrice[value]) {
                  const priceLabel = getPriceLabel(
                    'healthPrice',
                    value,
                    '',
                    '원'
                  );

                  return (
                    <li
                      key={key}
                      className="text-f16 font-bold flex justify-between"
                    >
                      <p>{key}</p>
                      <p>
                        {getPriceLabel(
                          'healthPrice',
                          value,
                          gymData.healthPrice[value],
                          Number(gymData.healthPrice[value]).toLocaleString()
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

        {isPriceAllNull('PtPrice') ? null : (
          <li>
            <ul className="text-f18 font-bold flex flex-col gap-s18">
              PT
              {Object.entries(ptPriceName).map(([key, value]) => {
                if (gymData.PtPrice[value]) {
                  const priceLabel = getPriceLabel('PtPrice', value, '', '원');

                  return (
                    <li
                      key={key}
                      className="text-f16 font-bold flex justify-between"
                    >
                      <p>{key}</p>
                      <p>
                        {getPriceLabel(
                          'PtPrice',
                          value,
                          gymData.PtPrice[value],
                          Number(gymData.PtPrice[value]).toLocaleString()
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
