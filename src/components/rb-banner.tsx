import Image from 'next/image';
import { FC } from 'react';
import BlindingLights from '../static/media/blinding-lights.webp';
import HeartIcon from '../static/icons/heart.svg';

const RandBBanner: FC = () => {
  return (
    <div className="relative flex h-[500px] w-[950px] justify-between overflow-hidden rounded-[35px] bg-[#E86239]">
      <div className="ml-20 w-[400px]">
        <div className="mt-28">
          <p className="text-sm font-semibold text-white">CURATED PLAYLIST</p>
        </div>
        <div className="mt-12">
          <p className="text-5xl font-bold text-white">R&B Hits</p>
          <p className="mt-5 text-gray-200">
            Hot Shot, Confessions, Beyonce, Usher
          </p>
          <p className="text-gray-200">The Dream, The Weeknd, 6lack...</p>
        </div>
        <div className="mt-12 inline-block h-[30px] w-[30px] rounded-md bg-[#ffffff79] p-[5px]">
          <Image
            className=""
            src={HeartIcon}
            alt="blinding lights"
            width={20}
            height={20}
          />
        </div>
      </div>

      <div className="relative bottom-[-70px] aspect-[10/67] w-[800px]">
        <Image
          src={BlindingLights}
          alt="blinding lights"
          layout={'fill'}
          objectFit={'contain'}
        />
      </div>
    </div>
  );
};

export default RandBBanner;
