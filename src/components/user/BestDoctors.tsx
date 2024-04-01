
function BestDoctors() {
    const imageUrl = `https://res.cloudinary.com/dw2cscitl/Mediheal/doctor_image/ifveavmgiz9t0zwzvgzr`;
  return (
    <div className="h-full bg-adminGreen">
    <div className="container mx-auto  lg:px-20" >
        <div className='grid grid-cols-3 h-full pb-40'>
            <div className="border-r border-gray-300 mx-3 lg:pl-20">
                <div className=" py-10 pb-3 mt-72 h-4/6 relative  group hover:bg-purple-200 cursor-pointer transition ease-out duration-300"> 
                    <div>
                        <div className="w-4 h-1/5 absolute right-0 -top-48  "></div>
                        <img src={imageUrl} alt="https://www.pngegg.com/en/png-nllal/download"/>
                    </div>
                    <div className="px-7 mt-20">
                        <h1 className="text-3xl font-bold group-hover:text-purple-300 transition ease-out duration-300">01.</h1>
                        <h2  className="text-1xl mt-4 font-bold">Roof light lamp</h2>
                        <p className="mt-2 opacity-60 group-hover:opacity-70 ">Diverse collection of roof lights of quality</p>
                    </div>
                </div>
            </div>
            <div className="border-r border-gray-300 mx-3 lg:pl-20">
                <div className=" py-10  pb-3 mt-32 h-4/6 relative  group hover:bg-indigo-200 cursor-pointer transition ease-out duration-300"> 
                    <div>
                        <div className="w-4 h-1/5 	absolute right-0 -top-48  "></div>
                        <img src="https://i.ibb.co/JB4GWMJ/pngegg-1.png" alt="https://www.pngegg.com/en/png-zquqj/download"/>
                    </div>
                   <div className="px-7 mt-20">
                        <h1 className="text-3xl font-bold group-hover:text-indigo-300 transition ease-out duration-300">02.</h1>
                        <h2  className="text-1xl mt-4 font-bold">Lounge Chair</h2>
                        <p className="mt-2 opacity-60 group-hover:opacity-70 ">Comfortable collection of perfect lounge chairs</p>
                    </div>
                </div>
            </div>
            <div className="border-r border-gray-300 mx-3 lg:pl-20">
                <div className=" py-10 pb-3 mt-5 h-4/6 relative hover:bg-red-200 cursor-pointer transition ease-out duration-300"> 
                     <div>
                        <div className="w-4 h-1/5 	absolute right-0 -bottom-44  "></div>
                        <img src="https://i.ibb.co/MgnH44p/pngegg-2.png" alt="https://www.pngegg.com/en/png-epwii/download"/>
                    </div>
                    <div className="px-7 mt-5">
                        <h1 className="text-3xl font-bold group-hover:text-red-300 transition ease-out duration-300">03.</h1>
                        <h2  className="text-1xl mt-4 font-bold">Scandinavia Couch</h2>
                        <p className="mt-2 opacity-60 group-hover:opacity-70 ">Best selection of scandinavia couch for your home</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default BestDoctors
