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
    refreshToken?:string
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

export type DepartmentDetailedProps = {
    data:DepartmentDataType | undefined
}

export type PatientData ={
    _id?:string
    id?:string
    userId?:string
    firstName:string
    secondName:string
    bloodGroup:string
    gender:string
    dob:Date | string
    age:number
    image:string | File | undefined
}

export type ExistingPatientCardProps = {
    data:PatientData
    state:File | string
    setState:(state:any)=>void
}

export type AddPatientFormProps = {
    state:boolean
    setState:(reload:boolean)=>void
}

export type PaymentFormProps = {
    clientSecret:string
}

export type WalletHistoryData={
    date:Date
    description:string
    cancelReason?:string
    amount:number
}

export type PatientCardProps = {
    _id?:string
    firstName:string 
    secondName:string 
    image:string | File | undefined
    age:number
    gender:string
    dob:Date | string
    bloodGroup:string
}