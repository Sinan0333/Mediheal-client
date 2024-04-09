import { useNavigate } from "react-router-dom"

function CancelPage() {
    const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <div className="flex flex-col items-center space-y-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="text-red-600 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <h1 className="text-4xl font-bold">Payment Canceled</h1>
          <p>Your payment was canceled.</p>
          <button
            className="inline-flex items-center px-4 py-2 text-white bg-red-600 border border-red-600 rounded-full hover:bg-red-700 focus:outline-none focus:ring"
            onClick={() => navigate('/')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span className="text-sm font-medium">Home</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CancelPage
