import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import Loader from '../static/icons/loader.svg';

export const Navbar: FC = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <div className="sticky top-0 z-50 flex h-20 w-full items-center justify-around bg-[#000000b6] backdrop-blur-xl">
        <div className="hover:cursor-pointer">
          <Link href={'/'}>
            <p className="text-xl text-white">
              <strong>Play</strong>Cloud
            </p>
          </Link>
        </div>
        <div className="">
          <p className="text-gray-400">
            Spotify&nbsp;&nbsp; {'>'} &nbsp;&nbsp;
            <span className="text-white">Popular playlists</span>
          </p>
        </div>
        <div className="">
          <p className="text-gray-400">Playlist Migrator</p>
        </div>
        <div className="">
          {status === 'loading' ? (
            <div className="grid w-[86.94px] place-content-center">
              <Image
                className="animate-spin"
                src={Loader}
                width={40}
                height={40}
                alt="Loader"
              />
            </div>
          ) : session ? (
            <Link href={'/profile'}>
              <div className="flex items-center hover:cursor-pointer">
                <div className="relative aspect-square h-8 w-8 overflow-hidden rounded-md">
                  <Image
                    src={session?.user?.image as string}
                    layout={'fill'}
                    objectFit={'cover'}
                    alt="user "
                  />
                </div>
                <p className="ml-4 text-gray-400 transition-all hover:text-white">
                  {session.user?.name}
                </p>
              </div>
            </Link>
          ) : (
            <Link href={'/api/auth/signin'}>
              <div className="rounded-md border-[1px] border-white px-5 py-1">
                <p className=" text-white hover:cursor-pointer">Login</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
