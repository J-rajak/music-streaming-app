import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetAllAlbumsQuery } from "./albumApiSlice";

import AlbumCard from "./AlbumCard";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";

// import { Helmet } from "react-helmet-async";

const AlbumsPage = () => {
  const { data: albums, isLoading, isError, error } = useGetAllAlbumsQuery();
  const selectedTheme = useSelector((state) => state.theme);

  useEffect(() => {
    if (isError) {
      console.error(error);
    }
  });

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorMsg error={error} />;
  }

  return (
    <section className="text-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-3xl font-semibold mb-2">Albums</h1>
        <Link to="/premium/upload/album">
          <button
            className={`bg-${selectedTheme} flex justify-center items-center mb-2 hover:bg-${selectedTheme}-50 active:bg-opacity-90 py-2 px-4 rounded-lg`}
          >
            <FaPlus className="text-xs mr-2" />
            <span>Upload Album</span>
          </button>
        </Link>
      </div>
      <p className="mb-8 text-gray-200">
        Indulge your passion for music with our handpicked selection of albums
      </p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {albums.map((album) => (
          <AlbumCard key={album._id} album={album} />
        ))}
      </motion.div>
    </section>
  );
};

export default AlbumsPage;
