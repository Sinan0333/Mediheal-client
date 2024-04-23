import { Medicines } from "../types/doctorTypes";

export const initialMedicine:Medicines={
    name:"",
    type:"",
    instruction:"",
    days:0
}

export type medicineAction = 
 | {type:"SET_NAME",payload:string}
 | {type:"SET_TYPE",payload:string}
 | {type:"SET_INSTRUCTION",payload:string}
 | {type:"SET_DAYS",payload:number}
| {type:"RESET_MEDICINE"}


export const medicineReducer=(state:Medicines,action:medicineAction):Medicines=>{
    switch(action.type){
        case "SET_NAME":
            return {...state,name:action.payload}
        case "SET_TYPE":
            return {...state,type:action.payload}
        case "SET_INSTRUCTION":
            return {...state,instruction:action.payload}
        case "SET_DAYS":
            return {...state,days:action.payload}
        case "RESET_MEDICINE":
            return initialMedicine
        default:
            return state
    }
}
