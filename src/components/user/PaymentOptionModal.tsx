import {wallet,stripe } from "../../constants/icons"

type PaymentOptionModalProps = {
    isChooseModalOpen: boolean
    setIsChooseModalOpen: (value: boolean) => void
    stripePayment: () => void
    walletPayment: () => void
}

function PaymentOptionModal({isChooseModalOpen,setIsChooseModalOpen,stripePayment,walletPayment}: PaymentOptionModalProps) {
  return (
    <div id="crypto-modal" tabIndex={-1} aria-hidden="true" className={`overflow-y-auto overflow-x-hidden mt-28  md:ml-[30%] lg:ml-[35%]  fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center w-full h-full`}>
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Choose Payment Option
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crypto-modal" onClick={() => setIsChooseModalOpen(!isChooseModalOpen)}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-4 md:p-5">
                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Choose one of our available Payment option to make a appointment.</p>
                <ul className="my-4 space-y-3">
                    <li>
                        <p className="flex items-center cursor-pointer p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white" onClick={walletPayment}>
                            <img src={wallet} className="w-8" alt="" />
                            <span className="flex-1 ms-3 whitespace-nowrap">Wallet</span>
                        </p>
                    </li>
                    <li>
                        <p className="flex items-center cursor-pointer p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white" onClick={stripePayment}>
                            <img src={stripe} className="w-8" alt="" />
                            <span className="flex-1 ms-3 whitespace-nowrap">Stripe Payment</span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
  )
}

export default PaymentOptionModal
