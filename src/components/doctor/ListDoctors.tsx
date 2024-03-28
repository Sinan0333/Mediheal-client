import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import  Actions from '../admin/Actions'
import { changeBlockStatus, listDoctorsApi } from "../../api/doctor/doctorApi"
import { DoctorData } from "../../types/doctorTypes"
import { notifyError, notifySuccess } from "../../constants/toast"

function ListDoctors() {
    const navigate = useNavigate()
    const [list,setList] = useState<DoctorData[] >([])
    const [reload,setReload] = useState<Boolean>(false)

    useEffect(()=>{
        listDoctorsApi().then((data)=>{
            setList(data.data)
        }).catch((err)=>{
            console.log(err.message);
        })
    },[reload])

    const handleBlocking = async(is_blocked:boolean,_id:string)=>{
        const response = await changeBlockStatus(_id,is_blocked) 
        if(!response.status) notifyError(response.message) 
        notifySuccess(response.message)
        setReload(!reload)
    }

  return (
    <div className="neumorphic py-2 px-2 ml-6 w-screen pl-4 pt-4">
        <h1 className="inline-block text-xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">Doctors</h1>
        <button className="neumorphic-navBtn w-20 h-8 font-semibold text-adminBlue float-right" onClick={()=>navigate('/admin/doctors/add')}>Add</button>
        <div className="overflow-x-auto">
            <table className="table-auto min-w-full border-collapse ">
                <thead>
                    <tr >
                        <th className="px-4 py-2 text-left w-auto">No</th>
                        <th className="px-4 py-2 text-left w-auto">Name</th>
                        <th className="px-4 py-2 text-left w-auto">Department</th>
                        <th className="px-4 py-2 text-left w-auto">Phone</th>
                        <th className="px-4 py-2 text-left w-auto">Email</th>
                        <th className="px-4 py-2 text-left w-auto">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((doc,i)=>{
                            return(
                                <tr key={i}>
                                    <td className="px-4 py-2">{i+1}</td>
                                    <td className="px-4 py-2">{doc.firstName + doc.secondName}</td>
                                    <td className="px-4 py-2">{doc.department.name}</td>
                                    <td className="px-4 py-2">{doc.phone}</td>
                                    <td className="px-4 py-2">{doc.email}</td>
                                    <td className="px-4 py-2"><Actions viewNav={`/admin/doctors/view/${doc._id}`} editNav={`/admin/doctors/edit/${doc._id}`} _id={doc._id} is_blocked={doc.is_blocked} handleBlock={handleBlocking}/></td>
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

export default ListDoctors
