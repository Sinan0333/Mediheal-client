import { RoundedImageInputProps } from '../../types/commonTypes';


function RoundedImageInput({state,setState,name}:RoundedImageInputProps) {

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setState(file);
    }
  };

  const handleChooseImageClick = () => {
    const fileInput = document.getElementById(`${name}`);
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="flex items-center">
         <label className="font-semibold text-lg w-32 mr-4 text-adminBlue">{name}</label>
      <div className="relative rounded-full overflow-hidden w-20 h-20 bg-gray-200">
        {state && (
          <img
            src={typeof(state) ==='string' ? `https://res.cloudinary.com/dw2cscitl/${state}` : URL.createObjectURL(state)}
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
        className="neumorphic-navBtn ml-4 px-4 py-2  text-adminBlue  hover:font-bold focus:outline-none "
      >
        Choose Image
      </button>
    </div>
  );
}

export default RoundedImageInput
