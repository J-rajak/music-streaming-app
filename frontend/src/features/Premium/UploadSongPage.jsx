import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

const UploadSongPage = () => {
  const [uploadStatus, setUploadStatus] = useState(null);

  const initialValues = {
    title: "",
    artiste: "",
    duration: "",
    genre: "",
    lyrics: "",
    coverImage: null,
    audioFile: null,
  };

//   const validationSchema = Yup.object().shape({
//     title: Yup.string().required("Title is required"),
//     artiste: Yup.string().required("Artiste is required"),
//     duration: Yup.string().required("Duration is required"),
//     genre: Yup.string().required("Genre is required"),
//     lyrics: Yup.string().required("Lyrics is required"),
//     coverImage: Yup.mixed().required("Cover image is required"),
//     audioFile: Yup.mixed().required("Audio file is required"),
//   });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Your form submission logic here
      setSubmitting(false);
    } catch (error) {
      console.error("Error uploading song:", error);
      setUploadStatus({ error: "Failed to upload song" });
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black rounded-md">
      <div className="max-w-md w-full p-6 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Upload Song</h1>
        <Formik
          initialValues={initialValues}
        //   validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <Field
                  type="text"
                  name="title"
                  id="title"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Add other form fields with similar structure */}

              <div className="mb-4">
                <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
                  Cover Image
                </label>
                <input
                  type="file"
                  id="coverImage"
                  name="coverImage"
                  onChange={(event) => {
                    setFieldValue("coverImage", event.currentTarget.files[0]);
                  }}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <ErrorMessage name="coverImage" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Add file input for audio file with similar structure */}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              >
                {isSubmitting ? "Uploading..." : "Upload Song"}
              </button>
              {uploadStatus && (
                <div className="mt-4 text-sm text-center">
                  {uploadStatus.error ? (
                    <div className="text-red-500">Error: {uploadStatus.error}</div>
                  ) : (
                    <div className="text-green-500">Song uploaded successfully!</div>
                  )}
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UploadSongPage;
