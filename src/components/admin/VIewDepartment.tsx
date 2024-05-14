import {useParams } from "react-router-dom"
import { getDepartmentDataById } from "../../api/admin/departmentManagementApi"
import { useEffect, useState } from "react"
import { DepartmentDataType } from "../../types/adminTypes"

function VIewDepartment() {
    const [departmentData,setDepartmentData] = useState<DepartmentDataType>()
    const imageUrl = `https://res.cloudinary.com/dw2cscitl/${departmentData?.image}`
    const logoUrl = `https://res.cloudinary.com/dw2cscitl/${departmentData?.logo}`
  
    
  
    const {_id} = useParams()
    useEffect(()=>{
      getDepartmentDataById(_id).then((data)=>{
        setDepartmentData(data.data)
      }).catch((err)=>{
        console.error(err);
      })
    },[])
    
    
    return (
      <div className="neumorphic py-2 px-2 w-screen min-h-screen lg:ml-64">
         <div className="flex justify-center">
          <h1 className="text-3xl sm:text-3xl md:text-4xl mb-4 font-bold text-adminGold">{departmentData?.name}</h1>
        </div>
        <div className="flex flex-col md:flex-row">
            <div className="flex flex-col items-center sm:flex-row sm:justify-evenly md:flex-col ml-6">
                <div className="neumorphic-halfRounded w-56 h-64 flex   items-center overflow-hidden   ">
                    <img src={imageUrl} alt="Your Image" className="object-cover" />
                </div>
                <div className="neumorphic-halfRounded w-56 h-48  mt-10 flex  items-center overflow-hidden  rounded-full ">
                    <img src={logoUrl} alt="Your Image" className="object-cover  w-full h-full" />
                </div>
            </div>
            <div className="ml-24 mt-10">
                <div className="mb-6 pr-4">
                    <label className="font-bold text-xl mr-4  text-adminBlue">Name:</label>
                    <label className="font-bold text-lg w-32  text-adminGreen">{departmentData?.name}</label>
                </div>
                <div className="mb-6 pr-4">
                    <label className="font-bold text-xl mr-4  text-adminBlue">Title:</label>
                    <label className="font-bold text-lg w-32  text-adminGreen">{departmentData?.title}</label>
                </div>
                <div className="mb-6 pr-4">
                    <label className="font-bold text-xl mr-4  text-adminBlue ">Description:</label>
                    <label className="font-bold text-lg w-32  text-adminGreen">{departmentData?.description}</label>
                </div>
            </div>
        </div>
      </div>
    )
}

export default VIewDepartment
