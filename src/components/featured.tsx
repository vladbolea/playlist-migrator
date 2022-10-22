import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { FeaturedItem } from '../interfaces/featured';

interface FeaturedProps {
  id: string;
  key: string;
  name: string;
  image: FeaturedItem['images'][0];
}

const Featured: FC<FeaturedProps> = (props) => {
  return (
    <>
      <Link href={`playlists/${props.id}`}>
        <div className="relative mx-auto mt-8 aspect-square w-5/6 min-w-[10rem] max-w-[14rem] overflow-hidden rounded-2xl text-white hover:cursor-pointer md:w-5/6 md:min-w-[11.5rem] md:transition-all md:hover:scale-95 md:hover:rounded-[40px]">
          <Image
            className="md:transition-all md:hover:scale-125"
            src={props?.image?.url}
            alt={props?.name}
            layout={'fill'}
            objectFit={'contain'}
          />
        </div>
      </Link>
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
          className="relative mt-8 aspect-square w-5/6 min-w-[10rem] max-w-[14rem] animate-pulse overflow-hidden rounded-2xl bg-gray-300 text-white hover:cursor-pointer md:w-5/6 md:min-w-[11.5rem] md:transition-all md:hover:scale-95 md:hover:rounded-[0px]"
        ></div>
      ))}
    </>
  );
};

export default Featured;
export { FeaturedSkeleton };
