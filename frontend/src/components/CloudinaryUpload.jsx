import { openUploadWidget } from "../utils/CloudinaryService";
const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

const CloudinaryUpload = ({ setUrl, setName, setDuration }) => {
  const uploadImageWidget = () => {
    let myUploadWidget = openUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        sources: ["local"],
      },
      function (error, result) {
        if (!error && result.event === "success") {
          console.log(result.info);
          setUrl(result.info.secure_url);
          setName(result.info.original_filename);
          setDuration(result.info.duration);
        } else {
          if (error) {
            console.log(error);
          }
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button
      className="bg-black text-white rounded-md p-4 font-semibold w-full hover:bg-gray-500 hover:text-gray-200"
      onClick={uploadImageWidget}
    >
      Select Audio File
    </button>
  );
};

export default CloudinaryUpload;
