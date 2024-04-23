import { AddPrescriptionValidationType, Diagnosis, Medicines } from "../../types/doctorTypes";

export const addMedicineValidation = ({days,instruction,name,type}:Medicines):string => {
    if(!name) return "Name is required"
    if(!type) return "Type is required"
    if(!instruction) return "Instruction is required"
    if(days === 0) return "Days is required"
    return "Success"
}

export const addDiagnosisValidation = ({name,instruction}:Diagnosis):string => {
    if(!name) return "Name is required"
    if(!instruction) return "Instruction is required"
    return "Success"
}

export const addPrescriptionValidation = ({bloodPressure,height,weight,bodyTemperature}:AddPrescriptionValidationType):string => {
    if(weight === 0) return "Weight is required"
    if(height === 0) return "Height is required"
    if(bloodPressure === 0) return "Blood Pressure is required"
    if(bodyTemperature === 0) return "Body Temperature is required"
    return "Success"
}