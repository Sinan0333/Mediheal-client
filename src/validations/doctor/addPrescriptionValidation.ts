import { AddPrescriptionValidationType, Diagnosis, Medicines } from "../../types/doctorTypes";

export const addMedicineValidation = ({days,instruction,name,type}:Medicines):string => {
    if(!name) return "Name is required"
    if(!type) return "Type is required"
    if(!instruction) return "Instruction is required"
    if(days === 0) return "Days is required"
    if(days < 0) return "Days must be greater than 0"
    return "Success"
}

export const addDiagnosisValidation = ({name,instruction}:Diagnosis):string => {
    if(!name) return "Name is required"
    if(!instruction) return "Instruction is required"
    return "Success"
}

export const addPrescriptionValidation = ({bloodPressure,height,weight,bodyTemperature}:AddPrescriptionValidationType):string => {
    if(weight < 0) return "Weight must be greater than 0"
    if(height < 0) return "Height must be greater than 0"
    if(bloodPressure < 0) return "Blood Pressure must be greater than 0"
    if(bodyTemperature < 0) return "Body must be greater than 0"
    return "Success"
}