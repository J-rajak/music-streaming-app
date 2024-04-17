import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CloudinaryUpload from "../../components/CloudinaryUpload";
import CloudinaryUploadImage from "../../components/CloudinaryUploadImage";
import { useUploadSongMutation } from "../Song/songApiSlice";

// import axios from "axios";

const UploadSongPage = () => {
  const [audioURL, setAudioURL] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [uploadedSongFileName, setUploadedSongFileName] = useState();
  const [uploadedImageFileName, setUploadedImageFileName] = useState();
  const [songDuration, setSongDuration] = useState();
  const [uploadSong] = useUploadSongMutation();

  const initialValues = {
    title: "",
    duration: "",
    genre: "pop",
    lyrics: "",
    coverImage: null,
    audioURL: null,
  };
  const handleSubmit = async (values) => {
    const { title, lyrics, genre } = values;
    console.log(values);
    const durationInMinutes = convertSecondsToMinutes(songDuration);

    try {
      const { data } = await uploadSong({
        title,
        lyrics,
        genre,
        duration: durationInMinutes,
        coverImage: imageURL,
        audioURL: audioURL,
      });
      console.log("Song uploaded successfully:", data);
      // Handle success or redirect to another page
    } catch (error) {
      console.error("Error uploading song:", error);
      // Handle error
    }
  };

  const convertSecondsToMinutes = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedSeconds = parseInt(remainingSeconds.toFixed(0)); // Convert to integer after fixing decimals
    return `${minutes}:${formattedSeconds < 10 ? "0" : ""}${formattedSeconds}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black rounded-md">
      <div className="max-w-md w-full p-6 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Upload Song</h1>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                placeholder="Enter song title"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="genre"
                className="block text-sm font-medium text-gray-700"
              >
                Genre
              </label>
              <Field
                as="select" // Changed to a select dropdown
                id="genre"
                name="genre"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
              </Field>
              <ErrorMessage
                name="genre"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="lyrics"
                className="block text-sm font-medium text-gray-700"
              >
                Lyrics
              </label>
              <Field
                as="textarea"
                id="lyrics"
                name="lyrics"
                placeholder="Enter song lyrics"
                rows={4}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage
                name="lyrics"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            {/**upload image  */}
            <div className="py-5">
              {uploadedImageFileName ? (
                <div className="bg-white rounded-full p-3 w-1/3">
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
            <div className="py-5">
              {uploadedSongFileName ? (
                <div className="bg-white rounded-full p-3 w-1/3">
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
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            >
              Upload song
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default UploadSongPage;
