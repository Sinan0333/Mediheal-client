import { useEffect, useState } from "react"
import DepartmentDetailed from "./DepartmentDetailed"
import DepartmentLogo from "./DepartmentLogo"
import { unblockedDepartments } from "../../api/admin/departmentApi"
import { DepartmentDataType } from "../../types/adminTypes"

function DepartmentGallery() {
    const [list,setList] = useState([])
    const [depDetails,setDepDetails] = useState<DepartmentDataType>()
console.log(depDetails);

    useEffect(()=>{
        unblockedDepartments().then((data)=>{
            setList(data.data)
        }).catch((err)=>{
            console.log(err.message);
        })
    },[])


  return (
    <div className=" pt-28   bg-userBlue">
        <div className="flex justify-center ">
            <p className="text-l font-semibold text-blue-600">OUR DEPARTMENTS</p>
        </div>
        <div className="flex justify-center mt-8 mb-12">
            <h1 className="text-4xl font-semibold text-adminBlue">Our Medical Services</h1>
        </div>
      <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
            <div className="-m-1 flex flex-wrap md:-m-2">
               {
                list.map((dep,i)=>{
                    return(
                        <DepartmentLogo key={i} data={dep} setState={setDepDetails}/>
                    )
                })
               }
            </div>
        </div>
        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
            <DepartmentDetailed/>
        </div>
    </div>
  )
}

export default DepartmentGallery
