import { useEffect, useState } from "react"
import DepartmentDetailed from "./DepartmentDetailed"
import DepartmentLogo from "./DepartmentLogo"
import { DepartmentDataType } from "../../types/adminTypes"
import { unblockedDepartments } from "../../api/user/departmentApi"

function DepartmentGallery() {
    const [list,setList] = useState([])
    const [depDetails,setDepDetails] = useState<DepartmentDataType >()

    useEffect(()=>{
        unblockedDepartments().then((data)=>{
            setList(data.data)
            setDepDetails(data.data[0])
        }).catch((err)=>{
            console.log(err.message);
        })
    },[])


  return (
    <div className="pt-28 bg-blue-100">
        <div className="flex justify-center ">
            <p className="text-l font-semibold text-blue-600">OUR DEPARTMENTS</p>
        </div>
        <div className="flex justify-center mt-8 mb-12">
            <h1 className="text-4xl font-semibold text-adminBlue">Our Medical Services</h1>
        </div>
      <div className="container mx-auto px-5 py-2  lg:pt-12 md:w-1/2">
            <div className="flex">
               {
                list.map((dep,i)=>{
                    return(
                        <DepartmentLogo key={i} data={dep} setState={setDepDetails}/>
                    )
                })
               }
            </div>
        </div>
        <div className="container flex justify-center mx-auto px-5 py-2 lg:px-32 lg:pt-12">
            <DepartmentDetailed data={depDetails}/>
        </div>
    </div>
  )
}

export default DepartmentGallery
