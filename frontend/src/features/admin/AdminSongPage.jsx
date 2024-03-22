import { useGetAllSongsQuery } from "../Song/songApiSlice";
import { useSearchParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";
import SongCard from "../Song/SongCard";
import Pagination from "../../components/Pagination";
import { motion } from "framer-motion";

const SongPage = () => {
  const [searchParams] = useSearchParams({ page: 1 });
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

  const handleUpload = (event) => {
    // You can handle the file upload process here
    console.log(event.target.files);
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorMsg error={error} />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Song Page</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleUpload}
        >
          Upload Song
        </button>
      </div>
      <input
        type="file"
        accept="audio/*"
        onChange={handleUpload}
        className="hidden"
      />

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
      <div className="flex justify-end mt-8">
        <Pagination
          path={pathname}
          currentPage={Number(page || 1)}
          totalPages={Math.ceil(total / 8)}
        />
      </div>
    </div>
  );
};

export default SongPage;
