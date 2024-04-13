import { useGetSongDetailsQuery } from "./songApiSlice";
import { useParams } from "react-router-dom";
import SongDetail from "./SongDetail";
import Lyrics from "./Lyrics";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";

const SongPage = () => {
  const { id } = useParams();
  const {
    data: song,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSongDetailsQuery(id);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorMsg error={error} />;
  }

  return (
    <>
      {isSuccess && (
        <section className=" text-gray-200">
          <SongDetail song={song} />
          <Lyrics lyrics={song.lyrics} />
        </section>
      )}
    </>
  );
};

export default SongPage;
