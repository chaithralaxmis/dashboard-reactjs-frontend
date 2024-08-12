import { IoSearch } from "react-icons/io5";

const SearchBox = () => {
  return (
    <>
      <div className="search-box position-relative d-flex align-items-center">
        <IoSearch className="mr-2" />
        <input type="search" placeholder="Search here..." />
      </div>
    </>
  );
};
export default SearchBox;
