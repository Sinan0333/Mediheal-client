import { AddDoctorValidationType } from "../../types/doctorTypes";

const emailPattern : RegExp =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const phonePattern : RegExp = /^\+?\d{10}$/
const textPattern : RegExp = /^[a-zA-Z ]+$/

export function addDoctorValidation(data:AddDoctorValidationType):string{

    if(!data.firstName) return "Firs name is required"
    else if(data.firstName.length < 3) return "First Name must contain 3 character"
    else if(!textPattern.test(data.firstName)) return "Please provide a valid first name"

    if(!data.secondName) return  "Second name is required"
    else if(data.secondName.length < 3)  return "Second Name must contain 3 character"
    else if(!textPattern.test(data.secondName)) return "Please provide a valid second name"

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

    if(!data.workingDays.length) return "Pleas add the working days"

    if(!data.schedule.startTime) return "Start time is required"
    else if(data.schedule.startTime<0) return "Start time must be positive"
    else if(data.schedule.startTime>24) return "start time must br less than 24"
    else if(data.schedule.startTime >= data.schedule.endTime) return "Start time must be less than end time"

    if(!data.schedule.endTime) return "End time is required"
    else if(data.schedule.startTime<0) return "Start time must be positive"
    else if(data.schedule.startTime>24) return "start time must br less than 24"
    else if(data.schedule.startTime >= data.schedule.endTime) return "Start time must be less than end time"

    if(!data.schedule.interval) return "Interval time is required"
    if(data.schedule.interval<0) return "Interval time must be positive"
    else if(data.schedule.interval>60) return "Interval time must br less than 60"

    if(!data.fees) return "Fees is required"
    else if(data.fees<0) return "Fees is must be greater than 0" 

    if(!data.image) return "Image is required"

    return 'Success'
}


export function editDoctorValidation(data:AddDoctorValidationType):string{
    

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

    if(!data.schedule.startTime) return "Start time is required"
    else if(data.schedule.startTime<0) return "Start time must be positive"
    else if(data.schedule.startTime>24) return "start time must br less than 24"
    else if(data.schedule.startTime >= data.schedule.endTime) return "Start time must be less than end time"

    if(!data.schedule.endTime) return "End time is required"
    else if(data.schedule.startTime<0) return "Start time must be positive"
    else if(data.schedule.startTime>24) return "start time must br less than 24"
    else if(data.schedule.startTime >= data.schedule.endTime) return "Start time must be less than end time"

    if(!data.schedule.interval) return "Interval time is required"
    if(data.schedule.interval<0) return "Interval time must be positive"
    else if(data.schedule.interval>60) return "Interval time must br less than 60"

    if(!data.fees) return "Fees is required"
    else if(data.fees<0) return "Fees is must be greater than 0" 
    if(!data.image) return "Image is required"

    return 'Success'
}