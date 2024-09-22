import { Link } from 'react-router-dom';
import { AppRating, AppImageDisplay, AppLoading } from '.';
import { memo, useState, useEffect } from 'react';
import { formatDate } from '@/utils';
import { object, string } from 'prop-types';
import { getAllData } from '@/api/CRUD';

AppReviewList.propTypes = {
  item: object,
  filter: string,
  expand: string,
};

function AppReviewList({ item, filter = '', expand = '' }) {
  const [isLoading, setIsLoading] = useState(true);
  const [reviewsList, setReviewsList] = useState([]);
  const itemId = item.id;
  const itemCollectionName = item.collectionName;

  useEffect(() => {
    const loadReviewList = async () => {
      if (itemId) {
        try {
          const fetchReviews = async () => {
            const data = await getAllData(
              'reviews',
              '-created',
              filter,
              expand
            );

            setReviewsList(data);
          };

          fetchReviews();
        } catch (error) {
          console.error('Error fetching review list:', error);
          setIsLoading(false);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadReviewList();
  }, [itemId]);

  return (
    <>
      {isLoading ? (
        <AppLoading isLoading={isLoading} />
      ) : (
        <>
          <div className="mx-s31 mt-[100px] flex justify-between">
            <h2 className="text-f18 font-semibold">
              리뷰 {reviewsList.length}개
            </h2>

            {itemCollectionName !== 'users' ? (
              <AppRating gymData={item} className="text-f14" />
            ) : (
              ''
            )}
          </div>

          <ul className="flex flex-col gap-s16 mt-s16 mb-s22">
            {reviewsList.map((review, index) => {
              const isLinkVisible =
                itemCollectionName === 'users' ||
                (review.trainer && itemCollectionName !== 'trainers');
              let LinkLabel = '';
              let LinkTo = '';

              if (isLinkVisible) {
                LinkTo = review.trainer
                  ? `/TrainerDetail/${review.expand.trainer.id}`
                  : `/main/${review.expand.gym.id}`;

                LinkLabel = review.trainer
                  ? review.expand.trainer.name
                  : review.expand.gym.name;
              }

              return (
                <li key={index} className="flex flex-col w-full pt-s12">
                  <div className="mx-s31 flex justify-between">
                    <div className="flex items-center">
                      <h3 className="text-f16 font-bold">
                        {itemCollectionName === 'users'
                          ? review.expand.gym.name
                          : review.expand.user.nickName}
                      </h3>

                      {isLinkVisible ? (
                        <Link
                          to={LinkTo}
                          aria-label={`${LinkLabel} 상세 정보 링크`}
                          className="text-f16 font-bold inline-flex items-center"
                        >
                          {review.trainer ? (
                            <p>&nbsp;/ {review.expand.trainer.name}</p>
                          ) : (
                            ''
                          )}
                          <svg
                            role="icon"
                            aria-label="상세 정보 링크 아이콘"
                            className="w-s22 h-s22 fill-white"
                          >
                            <use href="/assets/sprite.svg#arrow-forward" />
                          </svg>
                        </Link>
                      ) : (
                        ''
                      )}
                    </div>

                    <button>
                      <svg
                        role="icon"
                        aria-label="리뷰 메뉴 아이콘"
                        className="w-s18 h-s18 fill-white"
                      >
                        <use href="/assets/sprite.svg#kebap-button" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex gap-[0.125rem] mx-s31">
                    {[...Array(5)].map((_, index) => {
                      const getRatingColor =
                        index < review.rating ? '#FFCE31' : '#595959';

                      return (
                        <svg
                          key={index}
                          role="icon"
                          aria-label="별점"
                          className={'w-s14 h-s14'}
                          style={{
                            fill: getRatingColor,
                          }}
                        >
                          <use href="/assets/sprite.svg#star" />
                        </svg>
                      );
                    })}
                  </div>

                  <p className="text-f16 font-medium pt-s16 mx-s31">
                    {review.reviewContent}
                  </p>

                  <AppImageDisplay item={review} className="mt-s12 ml-s31" />

                  <p className="text-f12 font-medium pt-[0.5625rem] mx-s31 pb-s12 border-b border-solid border-strokeBlack">
                    {formatDate(review.created)}
                  </p>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}

export default memo(AppReviewList);
