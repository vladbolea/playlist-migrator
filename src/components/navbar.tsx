import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

import Loader from '../static/icons/loader.svg';

export const Navbar: FC<{ text?: string }> = ({ text }) => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  return (
    <>
      <div className="sticky top-0 z-50 flex h-20 w-full items-center justify-between bg-[#000000b6] backdrop-blur-xl md:justify-around">
        {text}
        <div className="ml-5 hover:cursor-pointer md:ml-0">
          <Link href={'/'}>
            <p className="text-xl text-white">
              <strong>Play</strong>Cloud
            </p>
          </Link>
        </div>
        <div className="hidden md:block">
          <p className="text-gray-400">
            Spotify&nbsp;&nbsp; {'>'} &nbsp;&nbsp;
            <span className="text-white">Popular playlists</span>
          </p>
        </div>
        <div className="hidden md:block">
          <p className="text-gray-400">Playlist Migrator</p>
        </div>
        <div className="hidden md:block">
          <Link href="/playlists/me/spotify">
            <p className="text-gray-400 transition-all hover:cursor-pointer hover:text-white">
              Your Playlists
            </p>
          </Link>
        </div>
        <div className="mr-5 flex md:mr-0 md:block">
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
                <div className="relative aspect-square h-8 overflow-hidden rounded-md">
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
            <Link href={'/signin'}>
              <div className="rounded-md border-[1px] border-white px-5 py-1">
                <p className=" text-white hover:cursor-pointer">Login</p>
              </div>
            </Link>
          )}
          {
            //6px
          }
          <div
            onClick={() => {
              setOpen(!open);
            }}
            className="z-50 ml-5 aspect-square w-8 hover:cursor-pointer md:hidden"
          >
            <motion.div
              animate={{
                y: open ? '4px' : 0,
                rotateZ: open ? '-45deg' : 0,
              }}
              transition={{
                ease: 'backInOut',
                duration: 0.3,
              }}
              className=" mb-[6px] mt-[10px] h-[3px] w-[32px] rounded-lg bg-gray-400"
            ></motion.div>
            <motion.div
              animate={{
                y: open ? '-5px' : 0,
                rotateZ: open ? '45deg' : 0,
              }}
              transition={{
                ease: 'backInOut',
                duration: 0.3,
              }}
              className=" h-[3px] w-[32px] rounded-lg bg-gray-400"
            ></motion.div>
          </div>
        </div>
      </div>
      <SideBar open={open} />
    </>
  );
};

const SideBar = ({ open }: { open: boolean }) => {
  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          x: '100vw',
        }}
        animate={{
          x: open ? 0 : '100vw',
          opacity: open ? [0, 0.2, 1] : 0,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
        className="fixed top-0 left-0 z-30 h-screen w-screen bg-[#282828]"
      ></motion.div>
    </>
  );
};
