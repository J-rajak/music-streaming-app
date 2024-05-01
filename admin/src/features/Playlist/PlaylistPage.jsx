import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPlaylistDetailsQuery } from "./playlistApiSlice";
import ResourceDetail from "../../components/ResourceDetail";
import SongList from "../../components/SongList";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";
import { Form, Button } from "react-bootstrap";

const PlaylistPage = () => {
  const { id } = useParams();
  const selectedTheme = useSelector((state) => state.theme);
  // const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const {
    data: playlist,
    isLoading,
    isError,
    error,
  } = useGetPlaylistDetailsQuery(id);
  const navigate = useNavigate();

  // const deleteHandler = async (id) => {
  //   if (window.confirm("Are you sure")) {
  //     try {
  //       await deleteUser(id);
  //       refetch();
  //     } catch (err) {
  //       toast.error(err?.data?.message || err.error);
  //     }
  //   }
  // };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorMsg error={error} />;
  }

  return (
    <section className="flex flex-col text-gray-200">
      <ResourceDetail resource={playlist} resourceType={"playlist"} />
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Songs</h2>
        {!playlist?.songs?.length ? (
          <button
            className={`bg-${selectedTheme} text-gray-100 hover:bg-${selectedTheme}-50 active:bg-opacity-90 py-2 px-4 rounded-md text-lg font-semibold transition duration-300`}
            onClick={() => navigate("/explore")}
          >
            Find songs on echosync
          </button>
        ) : (
          <SongList songs={playlist.songs} listType={"playlist"} />
        )}
        <div className="flex justify-end mt-4">
          <Button
            // onClick={deleteHandler}
            variant="danger"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </Button>
        </div>
      </section>
    </section>
  );
};

export default PlaylistPage;
