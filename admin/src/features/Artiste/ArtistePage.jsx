import { useEffect } from "react";
import {
  useGetArtisteDetailsQuery,
  useDeleteArtisteMutation,
} from "./artisteApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import ResourceDetail from "../../components/ResourceDetail";
import SongList from "../../components/SongList";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const ArtistePage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetArtisteDetailsQuery(id);
  const [deleteArtiste] = useDeleteArtisteMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      console.error(error);
    }
  });

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteArtiste(id);
        toast.success("Artiste removed successfully");
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
      <ResourceDetail resource={data.artiste} resourceType={"artiste"} />
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Songs</h2>
        <SongList songs={data.songs} listType={"artiste"} />
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

export default ArtistePage;
