import { openUploadWidget } from "../utils/CloudinaryService";
const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

const CloudinaryUploadImage = ({ setUrl, setName }) => {
  const uploadImageWidget = async () => {
    let myUploadWidget = await openUploadWidget(
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
      className="bg-black text-white rounded-full p-4 font-semibold w-full hover:bg-gray-500 hover:text-gray-200"
      onClick={uploadImageWidget}
    >
      Select image for thumbnail
    </button>
  );
};

export default CloudinaryUploadImage;
