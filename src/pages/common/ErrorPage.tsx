import { useNavigate, useParams } from "react-router-dom"


function ErrorPage() {
    const navigate = useNavigate()
    const {code} = useParams()
    console.log(code);
    
    let message = "Something went wrong"
    const statusCode = code ? parseInt(code) : 404

    if(statusCode === 404){
      message = "Page not found"
    }else if(statusCode === 500){
      message = "Internal server error"
    }else if(statusCode === 401){
      message = "Unauthorized"
    }else if(statusCode === 403){
      message = "Forbidden"
    }else if(statusCode === 400){
      message = "Bad request"
    }else if(statusCode === 405){
      message = "Method not allowed"
    }else if(statusCode === 422){
      message = "Unprocessable entity"
    }else if(statusCode === 429){
      message = "Too many requests"
    }else if(statusCode === 503){
      message = "Service unavailable"
    }else if(statusCode === 504){
      message = "Gateway timeout"
    }else {
      message = "Something went wrong"
    }

  return (
    <div className="grid h-screen place-content-center bg-white px-4">
        <div className="text-center">
            <h1 className="text-9xl font-black text-gray-200">{statusCode}</h1>

            <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>

            <p className="mt-4 text-gray-500">{message}</p>

            <p className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring" onClick={()=>navigate(-1)}>
            Go Back Home
            </p>
        </div>
    </div>
  )
}

export default ErrorPage
