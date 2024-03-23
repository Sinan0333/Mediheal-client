import { DepartmentApiType } from "./adminTypes"

export type AddDoctorValidationType  = {
    firstName:string | undefined
    secondName:string | undefined
    dob:Date | undefined
    age:number | undefined
    gender:string | undefined
    address:string | undefined
    experience:number | undefined
    phone:number | undefined
    email:string | undefined
    password:string | undefined
    department:string | undefined
    workingDays:string[]
    image:File | undefined
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
}