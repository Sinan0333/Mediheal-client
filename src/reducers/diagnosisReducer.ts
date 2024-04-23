import { Diagnosis } from "../types/doctorTypes";

export const initialDiagnosis:Diagnosis={
    name:"",
    instruction:""
}

export type diagnosisAction =
 | {type:"SET_NAME",payload:string}
 | {type:"SET_INSTRUCTION",payload:string}
 | {type:"RESET_DIAGNOSIS"}

 export const diagnosisReducer=(state:Diagnosis,action:diagnosisAction)=>{
     switch(action.type){
         case "SET_NAME":
             return {...state,name:action.payload}
         case "SET_INSTRUCTION":
             return {...state,instruction:action.payload}
         case "RESET_DIAGNOSIS":
             return initialDiagnosis
         default:
             return state
     }
 }