import Image from 'next/image';
import { FC } from 'react';
import BlindingLights from '../static/media/blinding-lights.webp';
import HeartIcon from '../static/icons/heart.svg';

const RandBBanner: FC = () => {
  return (
    <div className="relative mx-auto flex h-72 w-[90vw] items-center justify-between overflow-hidden rounded-3xl bg-[#E86239] md:h-[500px] md:w-[85%x] md:max-w-[850px] md:rounded-[35px]">
      <div className="z-10 m-5 w-full md:ml-20 md:w-[400px]">
        <div className="md:mt-18 mt-5">
          <p className="text-sm font-semibold text-white">CURATED PLAYLIST</p>
        </div>
        <div className="mt-5 md:mt-12">
          <p className="text-xl font-bold text-white md:text-5xl">R&B Hits</p>
          <p className="text-sm text-gray-200 md:mt-5 md:text-base">
            Hot Shot, Confessions, Beyonce, Usher
          </p>
          <p className="text-sm text-gray-200 md:text-base">
            The Dream, The Weeknd, 6lack...
          </p>
        </div>
        <div className="rounded-bg-[#ffffff79] mt-5 inline-block h-[30px] w-[30px] p-[5px]">
          <Image
            className=""
            src={HeartIcon}
            alt="blinding lights"
            width={20}
            height={20}
          />
        </div>
      </div>

      <div className="absolute right-[-180px] bottom-[-10px]  inline-block">
        <div className="relative hidden aspect-[10/6.7]  w-[700px] md:block">
          <Image
            className="absolute "
            src={BlindingLights}
            alt="blinding lights"
            layout={'fill'}
            objectFit={'contain'}
            priority={true}
          />
        </div>
      </div>
    </div>
  );
};

export default RandBBanner;
