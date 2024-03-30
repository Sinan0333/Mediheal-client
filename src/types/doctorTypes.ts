import { DepartmentApiType } from "./adminTypes"

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
    startTime:number
    endTime:number
    interval:number
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
    slots:string
    schedule:ScheduleType
    fees:number
    image:string 
    is_blocked:boolean
}

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