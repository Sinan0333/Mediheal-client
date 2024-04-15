import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { changeUserBlock, listUsers } from "../../api/user/UserManagment"
import { UserData } from "../../types/userTypes"
import { notifyError, notifySuccess } from "../../constants/toast"
import { blockGreen, blockRed } from "../../constants/icons"

function ListUsers() {

    const navigate = useNavigate()
    const [list,setList] = useState<UserData[] >()
    const [reload,setReload] = useState<Boolean>(false)

    useEffect(()=>{
        listUsers().then((data)=>{
            setList(data.data)
        }).catch((err)=>{
            console.log(err.message);
        })
    },[reload])

    const handleBlocking = async(is_blocked:boolean,_id:string)=>{
        const response = await changeUserBlock(_id,is_blocked) 
        if(!response.status) notifyError(response.message) 
        notifySuccess(response.message)
        setReload(!reload)
    }

  return (
    <div className="neumorphic py-2 px-2 ml-6 w-screen pl-4 pt-4">
        <h1 className="inline-block text-xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">Users</h1>
        <div className="overflow-x-auto">
            <table className="table-auto min-w-full border-collapse ">
                <thead>
                    <tr >
                        <th className="px-4 py-2 text-left w-auto">No</th>
                        <th className="px-4 py-2 text-left w-auto">Name</th>
                        <th className="px-4 py-2 text-left w-auto">Email</th>
                        <th className="px-4 py-2 text-left w-auto">Phone</th>
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
                                    <td className="px-4 py-2">{obj.email}</td>
                                    <td className="px-4 py-2">{obj.phone}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex">
                                            <button className="neumorphic-navBtn  py-2 px-2 w-8 h-8 rounded-lg" onClick={()=>navigate(`/admin/users/view/${obj._id}`)}>
                                                <img src="/src/assets/icons/eye.png" alt="Button Icon"  />
                                            </button>
                                           <button className={`${obj.is_blocked ? "neumorphic-clicked bg-red-950" : "neumorphic-navBtn"}  py-2 px-2 ml-1 w-8 h-8 rounded-lg`} onClick={() =>handleBlocking && handleBlocking(!obj.is_blocked,obj._id)}>
                                                <img  src={obj.is_blocked ? blockRed : blockGreen} alt="" />
                                            </button>
                                        </div>
                                    </td>
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

export default ListUsers
