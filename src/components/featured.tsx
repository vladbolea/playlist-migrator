import Image from 'next/image';

const Featured = (props: any) => {
  return (
    <>
      <div className="mt-10 h-[220px] w-[220px] overflow-hidden rounded-2xl text-white">
        <Image
          src={props.image.url}
          alt={props.name}
          width={220}
          height={220}
        />
      </div>
    </>
  );
};

export default Featured;
