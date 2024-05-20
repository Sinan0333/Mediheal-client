import { RoundedImageInputProps } from "../../types/commonTypes"

function UserImageInput({state,setState,name}:RoundedImageInputProps) {

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
    <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
        {
            state && (
                <img className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
            src={typeof(state) ==='string' ? state : URL.createObjectURL(state)}
            alt="Bordered avatar"/>
            )
        }
        <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id={name}
      />

        <div className="flex flex-col space-y-5 sm:ml-8">
            <button type="button"
                className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 " onClick={handleChooseImageClick}>
                Change picture
            </button >
            {/* <button type="button"
                className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                Delete picture
            </button> */}
        </div>
    </div>
  )
}

export default UserImageInput
