import { FC } from 'react';

const Background: FC = () => {
  return (
    <>
      <div className="absolute top-0 left-0 -z-10 h-full w-full  backdrop-blur-[140px]"></div>
      <div className="absolute -z-20 aspect-square w-40 rounded-full bg-blue-800" />

      <div className="absolute right-6 top-7 -z-20 aspect-square w-80 rounded-full bg-purple-700" />
    </>
  );
};

export default Background;
