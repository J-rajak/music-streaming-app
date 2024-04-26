import { useState } from "react";
import { useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

const apiUrl = "http://localhost:4000/api/search";

function isNotEmptyOrWhitespace(str) {
  return /\S/.test(str);
}

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [filterValue, setFilterValue] = useState("all"); // State for filter value
  const selectedTheme = useSelector((state) => state.theme);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSearchChange = async (e) => {
    const newQuery = e.target.value;
    if (isNotEmptyOrWhitespace(newQuery)) {
      handleSearch(newQuery);
    } else {
      setShowResults(false);
    }
  };

  const handleSearch = async (newQuery) => {
    try {
      const response = await fetch(
        `${apiUrl}?searchString=${encodeURIComponent(
          newQuery
        )}&filter=${filterValue}`
      );
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        setShowResults(true);
      }
    } catch (error) {
      console.error("Error searching for songs:", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
    // Optionally, you can trigger search when filter value changes
    handleSearch();
  };

  // handleFilterChange();

  return (
    <div className="mb-8 flex items-center justify-between">
      <div className="flex">
        <select
          className={`px-4 py-2 border border-gray-600 bg-${selectedTheme} text-white rounded-full focus:outline-none focus:ring focus:ring-white`}
          value={filterValue}
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="pop">Pop</option>
          <option value="rock">Rock</option>
          <option value="hip-hop">Hip Hop</option>
          <option value="electronic">Electronic</option>
          <option value="jazz">Jazz</option>
          <option value="country">Country</option>
          <option value="classical">Classical</option>
          <option value="metal">Metal</option>
          <option value="blues">Blues</option>
          <option value="reggae">Reggae</option>
          <option value="folk">Folk</option>
        </select>
      </div>
      <div className="relative w-3/4">
        <div className="">
          <div className="relative">
            <input
              className="w-full pl-10 pr-4 py-2 bg-transparent rounded-full border border-gray-600 shadow-sm focus:outline-none focus:border-white text-white"
              type="text"
              placeholder="Find songs on echosync..."
              onChange={handleSearchChange}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BsSearch className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Button */}
      {isAuthenticated && (
        <Link to="/premium">
          <button
            className={`bg-${selectedTheme} flex text-white justify-center items-center mb-2 hover:bg-${selectedTheme}-50 active:bg-opacity-90 py-2 px-4 rounded-full`}
          >
            Explore Premium
          </button>
        </Link>
      )}

      {/* Search Results */}
      {showResults && (
        <div className="absolute top-full right-0 mt-1 w-full bg-gray-400 rounded-md shadow-md">
          <ul className="divide-y divide-gray-200">
            {searchResults.map((result, index) => (
              <li
                key={index}
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer text-gray-900"
              >
                {result.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
