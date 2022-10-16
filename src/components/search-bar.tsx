import { Dispatch, SetStateAction } from 'react';

const SearchBar = ({
  search,
  setSearch,
  setSearchFocus,
  placeholder,
}: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  setSearchFocus: Dispatch<SetStateAction<boolean>>;
  placeholder: string;
}) => {
  return (
    <>
      <input
        className=" focus:border-bg-[#343434] mx-auto h-14 w-full rounded-[56px] bg-[#242424] indent-10 text-gray-100 outline-none transition-all hover:bg-[#343434] focus:border focus:bg-[#343434]"
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
        placeholder={placeholder}
      />
    </>
  );
};

export default SearchBar;
