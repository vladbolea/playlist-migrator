import { Dispatch, FC, SetStateAction } from 'react';

const TrackSearch = ({
  search,
  setSearch,
  setSearchFocus,
}: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  setSearchFocus: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <input
        className="focus:border-bg-[#343434] mx-auto h-14 w-full rounded-[56px] bg-[#242424] indent-10 text-gray-100 outline-none hover:bg-[#343434] focus:border focus:bg-[#343434]"
        onBlur={() => {
          setSearchFocus(false);
        }}
        onFocus={() => {
          setSearchFocus(true);
        }}
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
