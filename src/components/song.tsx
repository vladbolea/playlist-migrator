import Image from 'next/image';
import { FC, useState } from 'react';
import { SongItem } from '../interfaces/song';

import DenyIcon from '../static/icons/deny.svg';

const Song = ({
  info,
  toggleTrack,
}: {
  info: SongItem;
  toggleTrack: (index: string) => void;
}) => {
  return (
    <>
      <div
        style={{
          opacity: info?.removed === true ? 0.3 : 1,
          transition: 'opacity 0.1s ease-in-out',
        }}
        className="md:fw-full relative mx-auto mt-5 flex h-20 items-center justify-between overflow-hidden rounded-lg bg-[#1c1c1c] hover:bg-[#2a2a2a] "
      >
        <div className="relative aspect-square h-20">
          <Image
            src={info?.track?.album?.images?.[0]?.url}
            alt={info?.track?.album?.name}
            draggable={false}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="absolute left-[60px] ml-10">
          <h2 className="font-semibold text-white">{info?.track.name}</h2>
          <h3 className="text-sm text-gray-400">
            {info?.track.artists[0].name}
          </h3>
        </div>
        <div
          onClick={() => {
            toggleTrack(info?.track?.id);
          }}
          className="relative right-[15px] aspect-square h-8 hover:cursor-pointer"
        >
          <Image
            src={DenyIcon}
            alt="Remove song"
            loading="eager"
            layout="fill"
            draggable={false}
            objectFit="cover"
          />
        </div>
      </div>
    </>
  );
};

const SongSkeleton: FC = () => {
  const array = Array(20).fill(0);

  return (
    <>
      {array.map((item, index) => (
        <div
          key={index}
          className="md:fw-full mx-auto mt-5 flex h-14 animate-pulse items-center overflow-hidden rounded-lg bg-[#1c1c1c]"
        ></div>
      ))}
    </>
  );
};

export default Song;
export { SongSkeleton };
