import { compressImage } from '../../constants/convert';
import { RoundedImageInputProps } from '../../types/commonTypes';


function RoundedImageInput({state,setState,name}:RoundedImageInputProps) {
  const MAX_FILE_SIZE = 5 * 1024 * 1024; 

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
           compressImage(file).then((compressedFile) => {
            setState(compressedFile);
           })
          } else {
            setState(file);
        }
    }
  };

  const handleChooseImageClick = () => {
    const fileInput = document.getElementById(`${name}`);
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="flex items-center mb-4">
         <label className="font-semibold text-lg w-32 mr-4 text-adminBlue">{name}</label>
      <div className="relative rounded-full overflow-hidden w-14 h-14 md:w-20 md:h-20 bg-gray-200">
        {state && (
          <img
            src={typeof(state) ==='string' ? `${import.meta.env.VITE_CLOUDINARY_BASE_URL}/${state}` : URL.createObjectURL(state)}
            alt="Selected"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id={name}
      />
      
      <button
        onClick={handleChooseImageClick}
        className="neumorphic-navBtn ml-4 px-2 py-1 md:px-4 md:py-2  text-adminBlue  hover:font-bold focus:outline-none "
      >
        Choose Image
      </button>
    </div>
  );
}

export default RoundedImageInput
