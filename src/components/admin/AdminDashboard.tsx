import { useEffect, useState } from "react"
import { ResponseData } from "../../types/commonTypes"
import { totalDoctors } from "../../api/admin/doctorManagementApi"
import { getAdmitRevenue, totalAdmits } from "../../api/admin/admitHistoryApi"
import { totalBeds, totalFreeBeds } from "../../api/admin/bedManagementApi"
import { totalPatients } from "../../api/admin/patientManagementApi"
import { totalUsers } from "../../api/admin/UserManagementApi"
import { doctor,patient,bed,history,users } from "../../constants/icons"
import DashboardCard from "../common/DashboardCard"
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { PieChart } from '@mui/x-charts/PieChart';
import { getAppointmentRevenue, getStatusWiseAppointmentCountApi } from "../../api/admin/adminAppointmentsApi"
import { StatusWiseAppointmentCount } from "../../types/adminTypes"


function AdminDashboard() {
    const [doctors,setDoctors] = useState<number>(0)
    const [patients,setPatients] = useState<number>(0)
    const [beds,setBeds] = useState<number>(0)
    const [freeBeds,setFreeBeds] = useState<number>(0)
    const [admits,setAdmits] = useState<number>(0)
    const [user,setUser] = useState<number>(0)
    const [appointmentRevenue,setAppointmentRevenue] = useState<number[]>([])
    const [admitRevenue,setAdmitRevenue] = useState<number[]>([])
    const [statusCount,setStatusCount] = useState<StatusWiseAppointmentCount[]>([])

    useEffect(() => {
        const getData = async ()=>{
            const doctorsCount:ResponseData = await totalDoctors()
            const patientsCount:ResponseData = await totalPatients()
            const bedCount:ResponseData = await totalBeds()
            const freeBedsCount:ResponseData = await totalFreeBeds()
            const admitCount:ResponseData = await totalAdmits()
            const usersCount:ResponseData = await totalUsers()

            const appointmentRevenue:ResponseData = await getAppointmentRevenue()
            const admitRevenue:ResponseData = await getAdmitRevenue()
            const statusWiseAppointmentCount:ResponseData = await getStatusWiseAppointmentCountApi()
            
            setDoctors(doctorsCount.data)
            setPatients(patientsCount.data)
            setBeds(bedCount.data)
            setFreeBeds(freeBedsCount.data)
            setFreeBeds(freeBedsCount.data)
            setAdmits(admitCount.data)
            setUser(usersCount.data)

            setAppointmentRevenue(Object.values(appointmentRevenue.data))
            setAdmitRevenue(Object.values(admitRevenue.data))
            setStatusCount(statusWiseAppointmentCount.data)
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
        <div className="h-96 w-full">  
            <div className="flex mt-10">
                <div className="flex items-center mr-4">
                        <div className="rounded-full w-2 h-2 bg-[#3398fe] mr-2"></div>
                        <p>Revenue From Admits</p>
                </div>
                <div className="flex items-center mr-4">
                        <div className="rounded-full w-2 h-2 bg-[#03b2af] mr-2"></div>
                        <p>Revenue From Appointments</p>
                </div>
            </div>  
            <LineChart
                series={[
                    { curve: "linear", data: appointmentRevenue},
                    { curve: "linear", data: admitRevenue },
                ]}
            />
        </div>
        <div className="flex justify-between">
            <div >
                <PieChart
                    series={[
                        {
                            data:statusCount,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        },
                    ]}
                    height={150}
                />
            </div>
            <div className=" flex ml-10 items-center">    
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
                    <Gauge width={100} height={150} value={60} />
                </Stack>
            <div className="ml-6">
                <div className="flex items-center mr-4 w-full">
                        <div className="rounded-full w-2 h-2 bg-[#3398fe] mr-2"></div>
                        <p>Revenue From Admits</p>
                </div>
                <div className="flex items-center mr-4 w-full">
                        <div className="rounded-full w-2 h-2 bg-[#03b2af] mr-2"></div>
                        <p>Revenue From Appointments</p>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
}

export default AdminDashboard
