import { DoctorData } from "./doctorTypes"
import { PatientData } from "./userTypes"

export type DepartmentValidation = {
    name:string
    title:string
    description:string
    logoFile:File | string
    imageFile:File | string
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
    charge:number
    assignDate:Date
    dischargeDate:Date
    assignBy:string
    patient:string 
    description:string
}

export type BedEditData = {
    type:string
    charge:number
    assignDate:Date | string
    dischargeDate:Date | string
    assignBy:string 
    patient:string 
    description:string
    available?:boolean
}

export interface AdmitHistoryData {
    _id?:string
    bedId:string
    type:string
    charge:number
    assignDate:Date
    dischargeDate:Date
    assignBy:DoctorData
    patient:PatientData
    description:string
    total:number
}