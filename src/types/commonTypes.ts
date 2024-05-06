import { DoctorData } from "./doctorTypes"
import { PatientData } from "./userTypes"

export const days:string[] = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]

export type AuthProps = {
    pageName:'Signup' | 'Login'
    role:"user" | "admin" | "doctor"
    signupInputs:"hidden" | "block"
    changePage:String
}

export type AuthValidationProps = {
    name?:string
    phone?:string
    email:string 
    password:string
}

export type RoundedImageInputProps={
    state:File | undefined | string
    setState:(state:any)=>void
    name:string
}



export type ResponseData ={
    data:any
    status:boolean
    message:string
}

export type ListProps = {
    pageName:string
    btnName:string
    th:string[]
}

export type ActionProps={
    viewNav:string
    editNav:string
    _id:string 
    is_blocked:boolean
    handleBlock: (is_blocked: boolean,_id:string) => void
}

export type LabelProps={
    labelName:string
    value:string | number | undefined 
}

export type AdminHeaderNavigation={
    navigation:string
    _id?:string
}

export type AppointmentData ={
    _id?:string
    userId:string
    slotId:string
    startTime:string
    endTime:string
    day:string
    doctor:string | undefined
    patient:string
    bookedDate:Date
    fees:number
    chat:boolean
    status:"Pending" | "Checked" | "Cancelled"
    type:"Online" | 'Offline'
}

export type AppointmentPopulateData ={
    _id?:string
    userId:string
    slotId:string
    startTime:string
    endTime:string
    day:string
    doctor:DoctorData
    patient:PatientData
    bookedDate:Date
    fees:number
    chat:boolean
    status:string
    type:string
}

export type MessageType = {
    sender:string
    receiver:string
    text:string
}

export type GetChatDataApiType = {
    sender:string
    receiver:string
}