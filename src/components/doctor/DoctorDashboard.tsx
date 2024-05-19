import { useEffect, useState } from "react"
import { ResponseData } from "../../types/commonTypes"
import {patient,history, appointment } from "../../constants/icons"
import DashboardCard from "../common/DashboardCard"
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { PieChart } from '@mui/x-charts/PieChart';
import { StatusWiseAppointmentCount } from "../../types/adminTypes"
import { getDoctorAppointmentRevenue, getStatusWiseDoctorAppointmentCountApi, getTypeWiseDoctorAppointmentCountApi, totalDoctorAppointments, totalDoctorPatients } from "../../api/doctor/doctorAppointmentApi"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { getDoctorAdmitRevenue, totalDoctorAdmits } from "../../api/doctor/doctorAdmitHIstory"

function DoctorDashboard() {
    const doctorId = useSelector((state:RootState)=>state.doctor._id)
    const [admits,setAdmits] = useState<number>(0)
    const [patients,setPatients] = useState<number>(0)
    const [appointments,setAppointments] = useState<number>(0)
    const [appointmentRevenue,setAppointmentRevenue] = useState<number[]>([])
    const [admitRevenue,setAdmitRevenue] = useState<number[]>([])
    const [statusCount,setStatusCount] = useState<StatusWiseAppointmentCount[]>([])
    const [onlineAppointmentCount,setOnlineAppointmentCount] = useState<number>(0)


    useEffect(() => {
        const getData = async ()=>{
            const admitCount:ResponseData = await totalDoctorAdmits(doctorId)
            const appointmentCount:ResponseData = await totalDoctorAppointments(doctorId)
            const patientsCount:ResponseData = await totalDoctorPatients(doctorId)

            const appointmentRevenue:ResponseData = await getDoctorAppointmentRevenue(doctorId)
            const admitRevenue:ResponseData = await getDoctorAdmitRevenue(doctorId)
            const statusWiseAppointmentCount:ResponseData = await getStatusWiseDoctorAppointmentCountApi(doctorId)
            const typeWiseAppointmentCount:ResponseData = await getTypeWiseDoctorAppointmentCountApi(doctorId)            
            
            setAdmits(admitCount.data)
            setAppointments(appointmentCount.data)
            setPatients(patientsCount.data)

            setAppointmentRevenue(Object.values(appointmentRevenue.data))
            setAdmitRevenue(Object.values(admitRevenue.data))
            setStatusCount(statusWiseAppointmentCount.data)
            const totalAppointments:number = typeWiseAppointmentCount.data[0].count + ( typeWiseAppointmentCount.data.length > 1 ? typeWiseAppointmentCount.data[1].count : 0)
            const onlineAppointments:number = typeWiseAppointmentCount.data[0].type === "Online" ? typeWiseAppointmentCount.data[0].count :  typeWiseAppointmentCount.data[1].count
            setOnlineAppointmentCount((onlineAppointments/totalAppointments)*100)
        }
        getData()
    },[])
    
    return (
    <div className="neumorphic py-2   min-h-screen w-screen px-4 pt-4 lg:ml-64">
        <div className="flex justify-center">
            <h1 className="text-xl sm:text-2xl md:text-4xl mb-4 font-bold text-adminGold">Dashboard</h1>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-rows-1 gap-4 mt-6">
            <DashboardCard image={history} title="Admits" value={admits}/>
            <DashboardCard image={appointment} title="My Appointments" value={appointments}/>
            <DashboardCard image={patient} title="My Patients" value={patients}/>
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
        <div className="lg:flex justify-between">
            <div className="lg:w-1/3">
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
            <div className="flex ml-10 items-center">    
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
                    <Gauge width={150} height={150} value={onlineAppointmentCount} />
                </Stack>
            <div className="ml-6">
                <div className="flex items-center mr-4 w-full">
                        <div className="rounded-full w-2 h-2 bg-[#1976d2] mr-2"></div>
                        <p>Online Appointments</p>
                </div>
                <div className="flex items-center mr-4 w-full">
                        <div className="rounded-full w-2 h-2 bg-[#c5c5c5] mr-2"></div>
                        <p>Offline Appointments</p>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
}

export default DoctorDashboard
