import Image from 'next/image';
import { FC, useState } from 'react';
import { SongItem } from '../interfaces/song';

import DenyIcon from '../static/icons/deny.svg';
import AddIcon from '../static/icons/add.svg';

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
        className="relative mx-auto mt-5 flex h-20 w-[95%] items-center justify-between overflow-hidden rounded-lg bg-[#1c1c1c] hover:bg-[#2a2a2a] md:w-full md:min-w-[600px] "
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
          <h2 className="max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-white">
            {info?.track.name}
          </h2>
          <h3 className="text-sm text-gray-400">
            {info?.track.artists[0].name}
          </h3>
        </div>
        <div className="">
          <h3 className="relative right-[-100px] max-w-[220px] overflow-hidden text-ellipsis whitespace-nowrap text-right text-sm text-gray-400">
            {info?.track?.album?.name}
          </h3>
        </div>

        <div
          onClick={() => {
            toggleTrack(info?.track?.id);
          }}
          className="relative right-[15px] aspect-square h-8 hover:cursor-pointer"
        >
          <Image
            src={info?.removed ? AddIcon : DenyIcon}
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
          className="md:fw-full relative mx-auto mt-5 flex h-20 animate-pulse items-center justify-between overflow-hidden rounded-lg bg-[#1c1c1c]"
        ></div>
      ))}
    </>
  );
};

export default Song;
export { SongSkeleton };
