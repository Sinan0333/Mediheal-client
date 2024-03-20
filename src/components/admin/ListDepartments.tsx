import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { listDepartmentApi } from "../../api/admin/departmentApi"
import { DepartmentApiType } from "../../types/adminTypes"
import Actions from "./Actions"

function ListDepartments() {
    const navigate = useNavigate()
    const [list,setList] = useState<DepartmentApiType[] >()

    useEffect(()=>{
        listDepartmentApi().then((data)=>{
            setList(data.data)
        }).catch((err)=>{
            console.log(err.message);
        })
    },[])

  return (
    <div className="neumorphic py-2 px-2 ml-6 w-screen pl-4 pt-4">
        <h1 className="inline-block text-xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">Department</h1>
        <button className="neumorphic-navBtn w-20 h-8 font-semibold text-adminBlue float-right" onClick={()=>navigate('/admin/departments/add')}>Add</button>
        <div className="overflow-x-auto">
            <table className="table-auto min-w-full border-collapse ">
                <thead>
                    <tr >
                        <th className="px-4 py-2 text-left w-auto">No</th>
                        <th className="px-4 py-2 text-left w-auto">Name</th>
                        <th className="px-4 py-2 text-left w-auto">Title</th>
                        <th className="px-4 py-2 text-left w-auto">Description</th>
                        <th className="px-4 py-2 text-left w-auto">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list?.map((obj,i)=>{
                            return(
                                <tr key={i}>
                                    <td className="px-4 py-2">{i+1}</td>
                                    <td className="px-4 py-2">{obj.name}</td>
                                    <td className="px-4 py-2">{obj.title}</td>
                                    <td className="px-4 py-2">{obj.description}</td>
                                    <td className="px-4 py-2"><Actions/></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ListDepartments
