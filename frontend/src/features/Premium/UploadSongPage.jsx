import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CloudinaryUpload from "../../components/CloudinaryUpload";
// import axios from "axios";

const UploadSongPage = () => {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [uploadedSongFileName, setUploadedSongFileName] = useState();

  const initialValues = {
    title: "",
    duration: "",
    genre: "",
    lyrics: "",
    coverImage: null,
    audioFile: null,
  };

  const handleSubmit = async () => {
    // const data = {title, thumbnail, track: playlistUrl};
    // const response = await makeAuthenticatedPOSTRequest(
    //     "/song/create",
    //     data
    // );
  };

  console.log(playlistUrl);

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
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700"
              >
                Duration
              </label>
              <Field
                type="text"
                id="duration"
                name="duration"
                placeholder="Enter song duration"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage
                name="duration"
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
                type="text"
                id="genre"
                name="genre"
                placeholder="Enter song genre"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
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

            {/* File input for Cover Image */}
            <div className="mb-4">
              <label
                htmlFor="coverImage"
                className="block text-sm font-medium text-gray-700"
              >
                Cover Image
              </label>
              <input
                type="file"
                id="coverImage"
                name="coverImage"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage
                name="coverImage"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* File input for Audio File */}
            {/* <div className="mb-4">
              <label
                htmlFor="audioFile"
                className="block text-sm font-medium text-gray-700"
              >
                Audio File
              </label>
              <input
                type="file"
                id="audioFile"
                name="audioFile"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage
                name="audioFile"
                component="div"
                className="text-red-500 text-sm"
              />
            </div> */}

            <div className="py-5">
              {uploadedSongFileName ? (
                <div className="bg-white rounded-full p-3 w-1/3">
                  {uploadedSongFileName.substring(0, 35)}...
                </div>
              ) : (
                <CloudinaryUpload
                  setUrl={setPlaylistUrl}
                  setName={setUploadedSongFileName}
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
