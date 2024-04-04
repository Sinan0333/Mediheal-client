import { DoctorData } from "./doctorTypes"
import { PatientData } from "./userTypes"

export type DepartmentValidation = {
    name:string | undefined
    title:string | undefined
    description:string | undefined
    logoFile:File | undefined | string
    imageFile:File | undefined | string
}

export type DepartmentApiType = {
    _id?:string
    name:string
    title:string
    description:string
    logo:string
    image:string
}

export const initialDepartmentApiType:DepartmentApiType={
    _id:"",
    name:"",
    title:"",
    description:"",
    logo:"",
    image:""
}

export type DepartmentDataType = {
    _id:string
    name:string
    title:string
    description:string
    logo:string
    image:string
    is_blocked:boolean
}

export type AddBedValidation = {
    type:string
    charge:number
}

export type BedDataType = {
    _id:string
    type:string
    charge:number
    assignDate?:Date
    dischargeDate?:Date
    assignBy?:string | DoctorData
    patient?:string | PatientData
    description?:string
    available:boolean
    total?:number
    is_blocked:boolean
}

export type AssignPatientType = {
    type:string
    assignDate:Date
    dischargeDate:Date
    assignBy:string
    patient:string 
    description:string
}