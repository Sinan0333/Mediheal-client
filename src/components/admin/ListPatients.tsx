import { useEffect, useState } from "react"
import { PatientData } from "../../types/userTypes"
import { getPatients } from "../../api/user/Patient"

function ListPatients() {
    const [list,setList] = useState<PatientData[] >([])

    useEffect(()=>{
        getPatients().then((data)=>{
            setList(data.data)
        }).catch((err)=>{
            console.log(err.message);
        })
    },[])

  return (
    <div className="neumorphic py-2 px-2 ml-6 w-screen pl-4 pt-4">
        <h1 className="inline-block text-xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">Patients</h1>
        <div className="overflow-x-auto">
            <table className="table-auto min-w-full border-collapse ">
                <thead>
                    <tr >
                        <th className="px-4 py-2 text-left w-auto">No</th>
                        <th className="px-4 py-2 text-left w-auto">ID</th>
                        <th className="px-4 py-2 text-left w-auto">Name</th>
                        <th className="px-4 py-2 text-left w-auto">Age</th>
                        <th className="px-4 py-2 text-left w-auto">Gender</th>
                        <th className="px-4 py-2 text-left w-auto">Date Of Birth</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((obj,i)=>{
                            return(
                                <tr key={i}>
                                    <td className="px-4 py-2">{i+1}</td>
                                    <td className="px-4 py-2">{obj._id}</td>
                                    <td className="px-4 py-2">{obj.firstName} {obj.secondName}</td>
                                    <td className="px-4 py-2">{obj.age}</td>
                                    <td className="px-4 py-2">{obj.gender}</td>
                                    <td className="px-4 py-2">{new Date(obj.dob).toLocaleDateString()}</td>
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

export default ListPatients