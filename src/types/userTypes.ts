import { DepartmentDataType } from "./adminTypes"

export type SignupData={
    name:String
    phone:string 
    email:String
    password:String
}


export type LoginType ={
    email:string
    password:string
}


export type UserData = {
    _id:string
    name:string
    phone:string
    email:string
    image:string
    is_blocked:Boolean
}


export type SignupResponse = {
    userData?:UserData
    token?:string
    otp_id:string
    status:true | false
    message:string
}

export type ProfileValidationProps = {
    name:string
    email:string
    phone:string 
    password?:string
    newPassword?:string
}

export type EditUserDataProps = {
    _id:string
    name:string
    phone:string
    email:string
    password?:string
    newPassword:string
    image:string | undefined
} 


export type DepartmentLogoProps = {
    data:DepartmentDataType
    setState:(data:DepartmentDataType)=>void
}