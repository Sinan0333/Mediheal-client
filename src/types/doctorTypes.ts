import { DepartmentApiType,initialDepartmentApiType } from "./adminTypes"

export type AddDoctorValidationType  = {
    firstName:string | undefined
    secondName:string | undefined
    dob:Date | undefined | string
    age:number | undefined
    gender:string | undefined
    address:string | undefined
    experience:number | undefined
    phone:number | undefined
    email:string | undefined
    password:string | undefined
    department:string | undefined
    workingDays:number[]
    schedule:ScheduleType
    fees:number
    image:File | undefined | string
}

export type ScheduleType = {
    _id?:string
    startTime:number
    endTime:number
    interval:number
}

export type SlotsType={
    monday:ScheduleType[]
    tuesday:ScheduleType[]
    wednesday:ScheduleType[]
    thursday:ScheduleType[]
    friday:ScheduleType[]
    saturday:ScheduleType[]
    sunday:ScheduleType[]
}



export type SlotsTableProps = {
    slots:SlotsType
    state:File | string
    setState:(state:any)=>void
}

export type ExistingPatientProps = {
    state:File | string
    setState:(state:any)=>void
}

export const initialScheduleType:ScheduleType={
    startTime:0,
    endTime:0,
    interval:0
}

export const initialSlotsType = {
    monday:[initialScheduleType],
    tuesday:[initialScheduleType],
    wednesday:[initialScheduleType],
    thursday:[initialScheduleType],
    friday:[initialScheduleType],
    saturday:[initialScheduleType],
    sunday:[initialScheduleType],
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
    status:true | false
    message:string
}

export type ViewDoctorProps ={
    upBtn:boolean
}