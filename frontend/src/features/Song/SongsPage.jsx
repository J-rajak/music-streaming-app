import { useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { useGetAllSongsQuery } from "./songApiSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SongCard from "./SongCard";
import Pagination from "../../components/Pagination";
import { FaPlus } from "react-icons/fa";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";
import { motion } from "framer-motion";

const SongsPage = () => {
  const [searchParams] = useSearchParams({ page: 1 });
  const selectedTheme = useSelector((state) => state.theme);
  // const { isAuthenticated } = useSelector((state) => state.auth);
  const { isPremium } = useSelector((state) => state.auth);
  const page = searchParams.get("page");
  const {
    data: { songs, total } = {},
    isLoading,
    isError,
    error,
  } = useGetAllSongsQuery({ page: page ?? 1, limit: 8 });
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.search]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorMsg error={error} />;
  }

  return (
    <section className="text-gray-100">
      <h1 className="text-xl md:text-3xl font-semibold mb-2">Explore</h1>
      <p className="mb-8 text-gray-200">
        Browse amazing collection of songs on echosync
      </p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {songs?.map((song) => (
          <SongCard key={song._id} song={song} />
        ))}
      </motion.div>
      <div className="absolute top-0 right-0 mt-8 mr-8">
        {isPremium && (
          <Link to={isPremium ? "/premium/upload/song" : "/premium"}>
            <button
               className={`bg-${selectedTheme} flex justify-center items-center mb-2 hover:bg-${selectedTheme}-50 active:bg-opacity-90 py-2 px-4 rounded-lg`}
            >
              <FaPlus className="text-xs mr-2" />
              Upload song
            </button>
          </Link>
        )}
      </div>

      <div className="flex justify-end mt-8">
        <Pagination
          path={pathname}
          currentPage={Number(page || 1)}
          totalPages={Math.ceil(total / 8)}
        />
      </div>
    </section>
  );
};

export default SongsPage;
