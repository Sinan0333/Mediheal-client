import { AppointmentData } from "../../types/commonTypes";

export function bookNowValidation({endTime,patient,startTime}:AppointmentData):string{

    if(!endTime || !startTime) return "Please select the time"
    if(!patient) return "Please Select the Patient"

    return "Success"
}