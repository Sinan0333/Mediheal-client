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
    workingDays:string[]
    image:File | undefined | string
}

export type DoctorData = {
    _id?:string
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
    workingDays:string[]
    fees:number
    image:string 
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
    workingDays:string[]
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