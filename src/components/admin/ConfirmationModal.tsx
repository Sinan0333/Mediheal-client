type ConfirmationModalProps = {
    isConfirmationModalOpen: boolean
    setIsConfirmationModalOpen:(value: boolean) => void
    onConfirm: () => void
    message: string
}
function ConfirmationModal({isConfirmationModalOpen,message,onConfirm,setIsConfirmationModalOpen}: ConfirmationModalProps) {
  return (
    <div className="w-full flex justify-center ">
        <div className="m-10 w-screen max-w-screen-sm absolute flex justify-center">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto ">
                <div className="neumorphic relative p-4 text-center  rounded-lg  dark:bg-gray-800 sm:p-5">
                    <button type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal" onClick={() => setIsConfirmationModalOpen(!isConfirmationModalOpen)}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>                    <p className="mb-4 text-gray-500 dark:text-gray-300">{message}</p>
                    <div className="flex justify-center items-center space-x-4 ">
                        <button data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={() => setIsConfirmationModalOpen(!isConfirmationModalOpen)}>
                            No, cancel
                        </button>
                        <button type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={() => {setIsConfirmationModalOpen(!isConfirmationModalOpen),onConfirm()}}>
                            Yes, I'm sure
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    

  )
}

export default ConfirmationModal
