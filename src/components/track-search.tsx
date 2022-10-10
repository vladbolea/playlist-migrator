import { Dispatch, FC, SetStateAction } from 'react';

const TrackSearch = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <>
      <input
        className="focus:border-bg-[#343434] h-14 w-full rounded-[56px] bg-[#242424] indent-10 text-gray-100 outline-none hover:bg-[#343434] focus:border focus:bg-[#343434]"
        name="Tracks"
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="Search for tracks, albums or artists"
      />
    </>
  );
};

export default TrackSearch;
