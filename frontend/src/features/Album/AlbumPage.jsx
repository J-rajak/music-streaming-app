import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetAlbumDetailsQuery } from "./albumApiSlice";
import ResourceDetail from "../../components/ResourceDetail";
import SongList from "../../components/SongList";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";
import AddToPlaylistModal from "../Playlist/AddToPlaylistModal";
// import { Helmet } from "react-helmet-async";
// import { formatDate } from "../../utils";
import CreatePlaylistModal from "../Studio/MyPlaylists/CreatePlaylistModal";

const AlbumPage = () => {
  const { id } = useParams();
  const {
    data: album,
    isLoading,
    isError,
    error,
  } = useGetAlbumDetailsQuery(id);

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
    <section className=" text-gray-200">
      <ResourceDetail resource={album} resourceType={"album"} />
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Songs</h2>
        <SongList songs={album.songs} listType={"album"} />
      </section>
      <AddToPlaylistModal />
      <CreatePlaylistModal />
    </section>
  );
};

export default AlbumPage;
