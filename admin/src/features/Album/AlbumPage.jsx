import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAlbumDetailsQuery,
  useDeleteAlbumMutation,
} from "./albumApiSlice";
import ResourceDetail from "../../components/ResourceDetail";
import SongList from "../../components/SongList";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
// import { Helmet } from "react-helmet-async";
// import { formatDate } from "../../utils";

const AlbumPage = () => {
  const { id } = useParams();
  const {
    data: album,
    isLoading,
    isError,
    error,
  } = useGetAlbumDetailsQuery(id);
  const [deleteAlbum] = useDeleteAlbumMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      console.error(error);
    }
  });

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteAlbum(id);
        toast.success("Album removed successfully");
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
    <section className=" text-gray-200">
      <ResourceDetail resource={album} resourceType={"album"} />
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Songs</h2>
        {album.songs && <SongList songs={album.songs} listType={"album"} />}

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
    </section>
  );
};

export default AlbumPage;
