import Image from 'next/image';
import Link from 'next/link';
import { env } from '../env/client.mjs';
import { PlaylistItem } from '../interfaces/playlist';

const Playlist = ({ info }: { info: PlaylistItem }) => {
  return (
    <Link href={`${env.NEXT_PUBLIC_BASE_URL}/playlists/${info?.id}`}>
      <div className="m-5 mx-auto grid w-[80%] min-w-[180px] overflow-hidden rounded-lg bg-[#1f1f1f] transition-all hover:cursor-pointer hover:bg-[#2C2833]">
        <div className="relative mx-auto mt-5 aspect-square w-[80%] min-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap rounded-md shadow-xl transition-all ">
          <Image
            src={info?.images?.[0]?.url as string}
            layout="fill"
            alt={info?.name}
            objectFit="cover"
          />
        </div>
        <p className="mt-2 ml-5 w-[78%] overflow-hidden text-ellipsis  whitespace-nowrap py-2 font-semibold">
          {info?.name}
        </p>
        <p className="ml-5 mt-0 pb-5 text-sm text-gray-400">
          by {info?.owner?.display_name}
        </p>
      </div>
    </Link>
  );
};

const PlaylistSkeleton = () => {
  const array = Array(20).fill(0);

  return (
    <>
      {array.map((item, index) => (
        <div
          key={index}
          className="m-5 mx-auto grid h-[252px] w-[80%] min-w-[180px] animate-pulse overflow-hidden rounded-lg bg-[#1c1c1c] transition-all"
        ></div>
      ))}
    </>
  );
};

export { PlaylistSkeleton };

export default Playlist;
