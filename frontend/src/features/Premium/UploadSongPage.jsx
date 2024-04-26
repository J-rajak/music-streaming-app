import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CloudinaryUpload from "../../components/CloudinaryUpload";
import CloudinaryUploadImage from "../../components/CloudinaryUploadImage";
import { useUploadSongMutation } from "../Song/songApiSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { convertSecondsToTime } from "../../utils";
import { toast } from "react-toastify";

const UploadSongPage = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const [audioURL, setAudioURL] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [uploadedSongFileName, setUploadedSongFileName] = useState();
  const [uploadedImageFileName, setUploadedImageFileName] = useState();
  const [songDuration, setSongDuration] = useState();
  const [uploadSong, { isLoading, isError, error }] = useUploadSongMutation();
  const [formData, setFormData] = useState({});
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (imageURL && audioURL) {
      const durationInMinutes = convertSecondsToTime(songDuration);

      const updatedFormData = {
        ...formData,
        duration: durationInMinutes,
        genre: selectedGenre,
        coverImage: imageURL,
        audioURL: audioURL,
      };

      setFormData(updatedFormData); // Wait for setFormData to complete

      console.log(updatedFormData);
      try {
        const { error } = await toast.promise(uploadSong(updatedFormData).unwrap(), {
          pending: "Uploading...",
          success: "Upload successful",
          error: "An error occurred",
        });
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
      console.log("uploading.. on progress");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black rounded-md">
      <div className="max-w-md w-full p-6 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Upload Song</h1>
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

          <div className="mb-1">
            <label
              htmlFor="lyrics"
              className="block text-sm font-medium text-gray-700"
            >
              Lyrics
            </label>
            <textarea
              name="lyrics"
              placeholder="Enter song lyrics"
              onChange={(e) =>
                setFormData({ ...formData, lyrics: e.target.value })
              }
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {/**upload image  */}
          <div className="py-2" required>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Thumbnail for Song
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

          {/**upload song file */}
          <div required className="py-2 mb-3">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select audio file
            </label>
            {uploadedSongFileName ? (
              <div className="bg-black text-white p-3 w-full">
                {uploadedSongFileName.substring(0, 35)}...
              </div>
            ) : (
              <CloudinaryUpload
                setUrl={setAudioURL}
                setName={setUploadedSongFileName}
                setDuration={setSongDuration}
              />
            )}
          </div>

          <button
            type="submit"
            // disabled={isSubmitting}
            className={`bg-${selectedTheme} hover:bg-${selectedTheme} text-white font-bold py-2 px-4 rounded ${
              isLoading && "cursor-not-allowed"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin m-auto text-2xl text-gray-400" />
            ) : (
              `upload song`
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

export default UploadSongPage;
