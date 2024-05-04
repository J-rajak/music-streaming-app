import { useGetSongDetailsQuery, useDeleteSongMutation } from "./songApiSlice";
import { useParams, useNavigate } from "react-router-dom";
import SongDetail from "./SongDetail";
import Lyrics from "./Lyrics";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const SongPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: song,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSongDetailsQuery(id);
  const [deleteSong] = useDeleteSongMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteSong(id);
        toast.success("Song removed successfully");
        navigate("/");
        window.location.reload(); // Reload the page
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

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
          <div className="flex justify-end mt-4">
            <Button
              onClick={() => deleteHandler(id)}
              variant="danger"
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </Button>
          </div>
        </section>
      )}
    </>
  );
};

export default SongPage;
