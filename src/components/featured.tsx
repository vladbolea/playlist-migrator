import Image from 'next/image';
import { FC } from 'react';
import { FeaturedItem } from '../interfaces/featured';

interface FeaturedProps {
  key: string;
  name: string;
  image: FeaturedItem['images'][0];
}

const Featured: FC<FeaturedProps> = (props) => {
  return (
    <>
      <div className="relative mt-8 aspect-square w-5/6 min-w-[10rem] max-w-[14rem] overflow-hidden rounded-2xl text-white hover:cursor-pointer md:w-5/6 md:min-w-[11.5rem] md:transition-all md:hover:scale-95">
        <Image
          className="md:transition-all md:hover:scale-125"
          src={props.image.url}
          alt={props.name}
          layout={'fill'}
          objectFit={'contain'}
        />
      </div>
    </>
  );
};

const FeaturedSkeleton = () => {
  const skeleton = Array(12).fill(0);

  return (
    <>
      {skeleton.map((item, index) => (
        <div
          key={index}
          className=" relative mx-auto mt-8 aspect-square w-5/6 min-w-[10rem] max-w-[14rem] animate-pulse overflow-hidden rounded-2xl bg-gray-600 text-white hover:cursor-pointer md:w-5/6 md:min-w-[10rem]"
        ></div>
      ))}
    </>
  );
};

export default Featured;
export { FeaturedSkeleton };
