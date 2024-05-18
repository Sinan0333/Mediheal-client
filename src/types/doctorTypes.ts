import { DepartmentApiType,initialDepartmentApiType } from "./adminTypes"
import { AppointmentData } from "./commonTypes"
import { PatientData } from "./userTypes"

export type AddDoctorValidationType  = {
    firstName:string
    secondName:string
    dob:Date | string
    age:number
    gender:string
    address:string
    experience:number
    phone:number
    email:string
    password:string
    department:string
    workingDays:number[]
    schedule:ScheduleType
    fees:number
    image:File | string
}

export type ScheduleType = {
    _id?:string
    startTime:number
    endTime:number
    interval:number
}

export type OneSlotType = {
    _id?:string
    startTime:string
    endTime:string
    isReserved:boolean
    break:boolean
}

export const initialOneSlotsType:OneSlotType = {
    startTime:"",
    endTime:"",
    isReserved:false,
    break:false
}

export type SlotsType={
    _id?:string
    monday:OneSlotType[]
    tuesday:OneSlotType[]
    wednesday:OneSlotType[]
    thursday:OneSlotType[]
    friday:OneSlotType[]
    saturday:OneSlotType[]
    sunday:OneSlotType[]
}


export type SlotsTableProps = {
    slots:SlotsType
    selectedDay:string
    setSelectedDay:(state:string)=>void
    state:OneSlotType
    setState:(state:any)=>void
}

export type ExistingPatientProps = {
    state:File | string
    setState:(state:any)=>void
    reload:boolean
}

export const initialScheduleType:ScheduleType={
    startTime:0,
    endTime:0,
    interval:0
}

export const initialSlotsType = {
    monday:[initialOneSlotsType],
    tuesday:[initialOneSlotsType],
    wednesday:[initialOneSlotsType],
    thursday:[initialOneSlotsType],
    friday:[initialOneSlotsType],
    saturday:[initialOneSlotsType],
    sunday:[initialOneSlotsType],
}

export type DoctorData = {
    _id:string
    firstName:string 
    secondName:string 
    dob:Date 
    age:number 
    gender:string 
    address:string 
    experience:number 
    phone:number 
    email:string 
    password:string
    department:DepartmentApiType 
    workingDays:number[]
    slots:SlotsType
    schedule:ScheduleType
    fees:number
    image:string 
    is_blocked:boolean
}

export const initialDoctorData: DoctorData = {
    _id: '',
    firstName: '',
    secondName: '',
    dob: new Date(),
    age: 0,
    gender: '',
    address: '',
    experience: 0,
    phone: 0,
    email: '',
    password: '',
    department: initialDepartmentApiType, // Assuming you have a default value for DepartmentApiType
    workingDays: [],
    slots:initialSlotsType,
    schedule: initialScheduleType, // Assuming you have a default value for ScheduleType
    fees: 0,
    image: '',
    is_blocked: false,
};

export type AddDoctorApi = {
    _id?:string
    firstName:string 
    secondName:string 
    dob:Date | string
    age:number 
    gender:string 
    address:string 
    experience:number 
    phone:number 
    email:string 
    password:string
    department:string
    workingDays:number[]
    schedule:ScheduleType
    fees:number
    image:string 
}


export type DoctorCardProps ={
    _id:string
    firstName:string 
    secondName:string 
    experience:number 
    department:DepartmentApiType 
    image:string
    age:number
    gender:string
    fees:number
}

export type DoctorAuthResponse = {
    userData?:DoctorData
    token?:string
    refreshToken?:string
    status:true | false
    message:string
}

export type ViewDoctorProps ={
    upBtn:boolean
}

export type PrescriptionData = {
    patient:string 
    appointment:string 
    doctor:string
    weight:number
    height:number
    bloodPressure:number
    bodyTemperature:number
    diagnosis:Diagnosis[]
    medicines:Medicines[]
}

export type PrescriptionPopulateData = {
    patient:PatientData
    appointment:AppointmentData
    doctor:DoctorData
    weight:number
    height:number
    bloodPressure:number
    bodyTemperature:number
    diagnosis:Diagnosis[]
    medicines:Medicines[]
}

export type Diagnosis ={
    name:string
    instruction:string
}

export type Medicines ={
    name:string
    type:string
    instruction:string
    days:number
}

export type AddPrescriptionValidationType={
    weight:number
    height:number
    bloodPressure:number
    bodyTemperature:number
}