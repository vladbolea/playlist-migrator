import Image from 'next/image';
import Link from 'next/link';
import { env } from '../env/client.mjs';
import { PlaylistItem } from '../interfaces/playlist';

const Playlist = ({ info }: { info: PlaylistItem }) => {
  return (
    <Link href={`${env.NEXT_PUBLIC_BASE_URL}/playlists/${info?.id}`}>
      <div className="m-5 mx-auto grid w-[250px] overflow-hidden rounded-lg bg-[#1f1f1f] transition-all hover:cursor-pointer hover:bg-[#2C2833]">
        <div className="relative mx-auto  mt-5 aspect-square w-[220px] overflow-hidden text-ellipsis whitespace-nowrap rounded-md shadow-xl transition-all ">
          <Image
            src={info?.images?.[0]?.url as string}
            layout="fill"
            alt={info?.name}
            objectFit="cover"
          />
        </div>
        <p className="m-5 w-full overflow-hidden text-ellipsis whitespace-nowrap py-3 ">
          {info?.name}
        </p>
      </div>
    </Link>
  );
};

export default Playlist;
