import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import SongCard from "./SongCard";
import ErrorMsg from "../../components/ErrorMsg";
import { useGetSongsQuery } from "./songApiSlice";
import { motion } from "framer-motion";

const SearchResultsPage = () => {
  const { pageNumber, keyword } = useParams();
  const selectedTheme = useSelector((state) => state.theme);
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetSongsQuery({
    keyword,
    pageNumber,
  });

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMsg error={error} />;
  }

  const handleClick = () => {
    navigate("/explore");
  };

  return (
    <>
      {data.songs.length === 0 ? (
        <div>
          <p className="text-left mt-8 text-white font-bold text-2xl">
            No Results found ....
          </p>
          <div className=" h-4/6 mt-16 flex flex-col justify-center items-center">
            <button
              className={`bg-${selectedTheme} text-gray-100 hover:bg-${selectedTheme}-50 active:bg-opacity-90 py-2 px-4 rounded-full text-lg font-semibold transition duration-300`}
              onClick={handleClick}
            >
              Explore on echosync
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-left mt-8 text-white font-bold text-2xl">
            {`Search results for "${keyword}"`}
          </p>
          <div className="mt-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {data.songs.map((song) => (
                <SongCard key={song._id} song={song} />
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResultsPage;
