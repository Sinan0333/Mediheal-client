import { AddBedValidation } from "../../types/adminTypes";

export function addBedValidation({type,charge}:AddBedValidation):string{
    if(!type) return "Type is required"
    
    if(!charge) return "Charge is required"
    else if(charge<0) return "Charge must be greater than 0"

    return "Success"
}