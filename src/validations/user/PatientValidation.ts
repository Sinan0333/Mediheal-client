import { PatientData } from "../../types/userTypes";


 
export function addPatientValidation({firstName,secondName,age,dob,gender}:PatientData):string {
    
    if(!firstName) return "First name is required"
    else if(firstName.length < 3) return "First name must contain 3 letters"

    if(!secondName) return "Second name is required"
    else if(secondName.length < 3) return "Second name must contain 3 letters"

    if(!age) return "Age is required"
    
    if(!dob) return "Date of birth is required"

    if(!gender) return "Gender is required"

    return "Success"
}


