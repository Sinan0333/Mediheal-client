import { AddDoctorValidationType } from "../../types/doctorTypes";

const emailPattern : RegExp =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const phonePattern : RegExp = /^\+?\d{10}$/

export function addDoctorValidation(data:AddDoctorValidationType):string{

    if(!data.firstName) return "Firs name is required"
    else if(data.firstName.length < 3) return "First Name must contain 3 character"

    if(!data.secondName) return  "Second name is required"
    else if(data.secondName.length < 3)  return "Second Name must contain 3 character"

    if(!data.dob) return "DOB is required"
    
    if(!data.age)  return "Age is required"

    if(!data.gender) return "Gender is required"

    if(!data.address) return "Address is required"

    if(!data.experience) return "Experience is required"
    else if(data.experience < 2) return "Minimum 2 year experience is required"

    if(!data.phone) return "Phone Number is required"
    else if(!data.phone.toString().match(phonePattern)) return 'incorrect phone number'

    if(!data.email) return "Email is required"
    else if(!data.email.match(emailPattern)) return 'incorrect email format'

    if(!data.password) return "Password is required"
    else if(data.password.length < 6) return "Password must contain 3 character"

    if(!data.department) return "Email is required"

    if(data.workingDays.length<2) return "Pleas add the working days"

    if(!data.image) return "Image is required"

    data.workingDays.splice(0,1)

    return 'Success'
}


export function editDoctorValidation(data:AddDoctorValidationType):string{
    console.log("in validation",data.workingDays);
    

    if(!data.firstName) return "Firs name is required"
    else if(data.firstName.length < 3) return "First Name must contain 3 character"

    if(!data.secondName) return  "Second name is required"
    else if(data.secondName.length < 3)  return "Second Name must contain 3 character"

    if(!data.dob) return "DOB is required"
    
    if(!data.age)  return "Age is required"

    if(!data.gender) return "Gender is required"

    if(!data.address) return "Address is required"

    if(!data.experience) return "Experience is required"
    else if(data.experience < 2) return "Minimum 2 year experience is required"

    if(!data.phone) return "Phone Number is required"
    else if(!data.phone.toString().match(phonePattern)) return 'incorrect phone number'

    if(!data.email) return "Email is required"
    else if(!data.email.match(emailPattern)) return 'incorrect email format'

    if(!data.department) return "Email is required"

    if(!data.workingDays.length) return "Pleas add the working days"

    if(!data.image) return "Image is required"

    return 'Success'
}