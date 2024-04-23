import { add } from "../../constants/icons"

function Sample() {

  return (
    <div>
        <div className="neumorphic-navBtn flex justify-between items-center px-6 w-full h-10 mt-3">
            <div className="flex justify-between w-1/2">
                <p className="text-adminBlue text-lg font-semibold w-36">Medicine Name</p>
                <p className="text-adminBlue text-lg font-semibold w-36">Medicine Type</p>
                <p className="text-adminBlue text-lg font-semibold w-36">Instructions</p>
            </div>
            <div className="flex">
                <p className="text-adminBlue text-lg font-semibold mr-24">Days</p>
                {/* <button className="neumorphic-navBtn  py-1 px-1 w-7 h-7 rounded-lg" >
                    <img className="w-full" src={add} alt="Button Icon"  />
                </button> */}
            </div>
        </div>
        <div className="flex justify-between items-center px-6 w-full  mt-3">
            <div className="flex w-1/2">
              <input className="h-8 py-2 w-72 border-transparent focus:outline-none" type=""   placeholder="" />
              <input className="h-8 py-2 w-56 ml-2 border-transparent focus:outline-none" type="text"  placeholder="" />
              <textarea className="h-8 py-2 min-w-96 ml-2 border-transparent focus:outline-none"   placeholder="" />
            </div>
            <div className="flex bg-slate-400 ">
              <input className="h-8 py-2   bg-transparent border-transparent focus:outline-none bg-slate-50" type="text"  placeholder="" />
              <button className="neumorphic-navBtn  py-1 px-1 w-7 h-7 rounded-lg " >
                  <img className="w-full" src={add} alt="Button Icon"  />
              </button>
            </div>
        </div>
    </div> 
  )
}

export default Sample
