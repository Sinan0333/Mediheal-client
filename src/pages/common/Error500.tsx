import { useNavigate } from "react-router-dom"

function Error500() {
    const navigate = useNavigate()
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
        <div className="text-center">
            <h1 className="text-9xl font-black text-gray-200">500</h1>

            <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Internal Error</p>

            <p className="mt-4 text-gray-500">Whoops! That page doesn’t exist.</p>

            <p className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring" onClick={()=>navigate(-1)}>
            Go Back Home
            </p>
        </div>
    </div>
  )
}

export default Error500
