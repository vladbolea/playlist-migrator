import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { FC } from 'react';
import { env } from '../../env/client.mjs';

const Playlists: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  props
) => {
  console.log(JSON.stringify(props?.playlists));

  return (
    <>
      <div className="">{props.playlists.length}</div>
      <div className="">
        {/* {props.playlists &&
          props.playlists?.items.map((item) => <p key={item.id}>{item.name}</p>)} */}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.params?.playlists as string;

  const playlists = await fetch(
    `${env.NEXT_PUBLIC_BASE_URL}/api/spotify/getplaylists`,
    {
      method: 'POST',
      body: JSON.stringify(userId),
    }
  ).then((r) => r.json());

  return {
    props: {
      playlists: playlists,
    },
  };
};

export default Playlists;
