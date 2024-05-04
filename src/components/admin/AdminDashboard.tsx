import { useEffect, useState } from "react"
import { ResponseData } from "../../types/commonTypes"
import { totalDoctors } from "../../api/admin/doctorManagementApi"
import { totalAdmits } from "../../api/admin/admitHistoryApi"
import { totalBeds, totalFreeBeds } from "../../api/admin/bedManagementApi"
import { totalPatients } from "../../api/admin/patientManagementApi"
import { totalUsers } from "../../api/admin/UserManagementApi"
import { doctor,patient,bed,history,users } from "../../constants/icons"
import DashboardCard from "../common/DashboardCard"

function AdminDashboard() {
    const [doctors,setDoctors] = useState<number>(0)
    const [patients,setPatients] = useState<number>(0)
    const [beds,setBeds] = useState<number>(0)
    const [freeBeds,setFreeBeds] = useState<number>(0)
    const [admits,setAdmits] = useState<number>(0)
    const [user,setUser] = useState<number>(0)

    useEffect(() => {
        const getData = async ()=>{
            const doctorsCount:ResponseData = await totalDoctors()
            const patientsCount:ResponseData = await totalPatients()
            const bedCount:ResponseData = await totalBeds()
            const freeBedsCount:ResponseData = await totalFreeBeds()
            const admitCount:ResponseData = await totalAdmits()
            const usersCount:ResponseData = await totalUsers()
            
            setDoctors(doctorsCount.data)
            setPatients(patientsCount.data)
            setBeds(bedCount.data)
            setFreeBeds(freeBedsCount.data)
            setFreeBeds(freeBedsCount.data)
            setAdmits(admitCount.data)
            setUser(usersCount.data)
        }
        getData()
    },[])
    
    return (
    <div className="neumorphic py-2  ml-6 w-screen px-4 pt-4 h-screen ">
        <div className="flex justify-center">
            <h1 className="text-xl sm:text-2xl md:text-4xl mb-4 font-bold text-adminGold">Dashboard</h1>
        </div>
        <div className="grid grid-cols-6 grid-rows-1 gap-4 mt-6">
            <DashboardCard image={doctor} title="Doctors" value={doctors}/>
            <DashboardCard image={users} title="Users" value={user}/>
            <DashboardCard image={patient} title="Patients" value={patients}/>
            <DashboardCard image={history} title="Admits" value={admits}/>
            <DashboardCard image={bed} title="Beds" value={beds}/>
            <DashboardCard image={bed} title="vacant" value={freeBeds}/>
        </div>
    </div>
    )
}

export default AdminDashboard
