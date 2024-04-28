import { useState } from "react";
import { useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { Link, useParams, useNavigate } from "react-router-dom";

const Search = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword("");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="mb-8 flex items-center justify-between">

      <div className="relative w-3/4">
        <div className="">
          <div className="relative">
            <form onSubmit={handleSubmit}>
              <input
                className="w-full pl-10 pr-4 py-2 bg-transparent rounded-full border border-gray-600 shadow-sm focus:outline-none focus:border-white text-white"
                type="text"
                placeholder="Find songs on echosync..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </form>

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
            className={`bg-${selectedTheme} flex text-white justify-center items-center hover:bg-${selectedTheme}-50 active:bg-opacity-90 py-2 px-4 rounded-full`}
          >
            Explore Premium
          </button>
        </Link>
      )}
    </div>
  );
};

export default Search;
