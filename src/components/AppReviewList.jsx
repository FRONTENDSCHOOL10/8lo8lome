import { Link } from 'react-router-dom';
import { AppRating, AppImageDisplay, AppLoading } from '.';
import { memo, useState, useEffect } from 'react';
import { formatDate } from '@/utils';
import { object } from 'prop-types';
import { getAllData } from '@/api/CRUD';

AppReviewList.propTypes = {
  gym: object,
};

function AppReviewList({ gym }) {
  const [isLoading, setIsLoading] = useState(true);
  const gymId = gym.id;
  const [reviewsList, setReviewsList] = useState([]);

  useEffect(() => {
    const loadReviewList = async () => {
      if (gymId) {
        try {
          const fetchReviews = async () => {
            const data = await getAllData(
              'reviews',
              '-created',
              `gym = '${gymId}'`,
              'user, trainer'
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
  }, [gymId]);

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
            <AppRating gymData={gym} className="text-f14" />
          </div>

          <ul className="flex flex-col gap-s16 mt-s16 mb-s22">
            {reviewsList.map((review) => {
              return (
                <li key={review.id} className="flex flex-col w-full pt-s12">
                  <div className="mx-s31 flex justify-between">
                    <div className="flex items-center">
                      <h3 className="text-f16 font-bold">
                        {review.expand.user.nickName}
                      </h3>

                      {review.trainer ? (
                        <Link
                          to={`/TrainerDetail/${review.expand.trainer.id}`}
                          aria-label={`${review.expand.trainer.name} 트레이너 상세 정보 링크`}
                          className="text-f16 font-bold inline-flex items-center"
                        >
                          <p>&nbsp;/ {review.expand.trainer.name}</p>
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
                        index < review.rating ? 'yellow-300' : 'ratingGray';

                      return (
                        <svg
                          key={index}
                          role="icon"
                          aria-label="별점"
                          className={`w-s14 h-s14 fill-${getRatingColor}`}
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
