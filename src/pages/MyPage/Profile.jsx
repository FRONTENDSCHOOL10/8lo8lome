const myProfile = [
  {
    id: 1,
    title: '놀고싶닥',
    email: 'nolgosipda@naver.com',
    image: 'https://picsum.photos/200',
  },
];
export default function Profile() {
  return (
    <section className="flex h-24 p-s20 w-80">
      {myProfile.map((item) => {
        return (
          <div key={item.id} className="flex flex-col text-white">
            <img
              className="rounded-full"
              src={item.image}
              alt=""
              width={64}
              height={64}
            />
          </div>
        );
      })}
    </section>
  );
}
