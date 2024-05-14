import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CloudinaryUploadImage from "../../components/CloudinaryUploadImage";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";
import ArtisteSongList from "../../components/ArtisteSongList";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGetArtisteDetailsQuery } from "../Artiste/artisteApiSlice";
import { useUploadAlbumMutation } from "../Song/songApiSlice";

import { toast } from "react-toastify";

const UploadAlbumPage = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const { userId } = useSelector((state) => state.auth);
  const { data } = useGetArtisteDetailsQuery(userId);

  const [uploadAlbum, { isLoading, isError, error }] = useUploadAlbumMutation();
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState("");
  const [uploadedImageFileName, setUploadedImageFileName] = useState();
  const [formData, setFormData] = useState({});
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedSongs, setSelectedSongs] = useState([]); // State to hold selected song IDs

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorMsg error={error} />;
  }

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSongCheckboxChange = (songId) => {
    // Check if the songId is already in the selectedSongs array
    // console.log(songId);
    const isSelected = selectedSongs.includes(songId);
    if (isSelected) {
      // If selected, remove it from the array
      setSelectedSongs(selectedSongs.filter((id) => id !== songId));
    } else {
      // If not selected, add it to the array
      setSelectedSongs([...selectedSongs, songId]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const updatedFormData = {
    //   ...formData,
    //   genre: selectedGenre,
    //   coverImage: imageURL,
    //   songs: selectedSongs,
    // };

    // console.log(updatedFormData);

    if (imageURL && selectedSongs ) {
      const updatedFormData = {
        ...formData,
        genre: selectedGenre,
        coverImage: imageURL,
        songs: selectedSongs,
      };

      setFormData(updatedFormData); // Wait for setFormData to complete

      try {
        const { error } = await toast.promise(
          uploadAlbum(updatedFormData).unwrap(),
          {
            pending: "Uploading...",
            success: "Upload successful",
            error: "An error occurred",
          }
        );
        if (error) {
          console.error(error);
        } else {
          navigate("/");
          console.log("Upload successful");
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      toast.error("Loading......");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black rounded-md">
      <div className="max-w-md w-full p-6 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Upload Album</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter song title"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="genre"
              className="block text-sm font-medium text-gray-700"
            >
              Genre
            </label>
            <select
              name="genre"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleGenreChange}
            >
              <option value="">Select a genre</option>
              <option value="pop">Pop</option>
              <option value="rock">Rock</option>
              <option value="hip-hop">Hip Hop</option>
              <option value="country">Country</option>
              <option value="electronic">Electronic</option>
              <option value="jazz">Jazz</option>
              <option value="folk">Folk</option>
              <option value="funk">Funk</option>
              <option value="blues">Blues</option>
            </select>
          </div>

          {/**upload image  */}
          <div className="py-2" required>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Image for Album
            </label>
            {uploadedImageFileName ? (
              <div className="bg-black text-white rounded-none p-3 w-full">
                {uploadedImageFileName.substring(0, 35)}...
              </div>
            ) : (
              <CloudinaryUploadImage
                setUrl={setImageURL}
                setName={setUploadedImageFileName}
              />
            )}
          </div>
          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Songs</h2>
            {data && (
              <ArtisteSongList
                songs={data.songs}
                handleSongCheckboxChange={handleSongCheckboxChange}
              />
            )}
          </section>
          <button
            type="submit"
            className={`bg-${selectedTheme} hover:bg-${selectedTheme} text-white mt-2 font-bold py-2 px-4 rounded ${
              isLoading && "cursor-not-allowed"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin m-auto text-2xl text-gray-400" />
            ) : (
              `upload album`
            )}
          </button>
        </form>
        {isError && (
          <span className="block text-sm mt-2 saturate-100 text-red-500">
            {error?.data?.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default UploadAlbumPage;
