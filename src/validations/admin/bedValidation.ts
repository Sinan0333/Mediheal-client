import { AddBedValidation, AssignPatientType, BedEditData } from "../../types/adminTypes";

export function addBedValidation({type,charge}:AddBedValidation):string{
    if(!type) return "Type is required"
    
    if(!charge) return "Charge is required"
    else if(charge<0) return "Charge must be greater than 0"

    return "Success"
}

export function assignPatientValidation({patient,type,assignDate,dischargeDate,description,assignBy,charge}:AssignPatientType):string{
    if(!patient) return "PatientId is required"
    else if(patient.length < 5) return "PatientId must contain 5 characters"
    
    if(!type) return "Bed Type is required"
    if(!charge) return "Charge is required"
    else if(charge < 0) return "Charge must be positive"

    if(!assignDate) return "Assign date is required"
    else if(assignDate > dischargeDate) return "Please Provide a Valid Assign Date"

    if(!dischargeDate) return "Discharge date is required"
    else if(dischargeDate > new Date()) return "Please Provide a Valid Discharge Date"
    else if(dischargeDate < assignDate) return "Please Provide a Valid Discharge Date"

    if(!description) return "Description is required"
    else if(description.length < 5 ) return "Description Must contain 5 letters"

    if(!assignBy) return "Assign by is required"

    return "Success"
}

export function editBedValidation({patient,type,assignDate,dischargeDate,description,assignBy,charge}:BedEditData):string{
    if(!patient) return "PatientId is required"
    else if(patient.length < 5) return "PatientId must contain 5 characters"
    
    if(!type) return "Bed Type is required"

    if(!charge) return "Charge is required"
    else if(charge < 0) return "Charge must be positive"

    if(!assignDate) return "Assign date is required"
    else if(assignDate > dischargeDate) return "Please Provide a Valid Assign Date"

    if(!dischargeDate) return "Discharge date is required"
    else if(dischargeDate < assignDate) return "Please Provide a Valid Discharge Date"

    if(!description) return "Description is required"
    else if(description.length < 5 ) return "Description Must contain 5 letters"

    if(!assignBy) return "Assign by is required"

    return "Success"
}