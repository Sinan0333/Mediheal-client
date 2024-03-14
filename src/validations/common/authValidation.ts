import { authValidationProps } from "../../types/commonTypes";

const emailPattern : RegExp =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const phonePattern : RegExp = /^\+?\d{10}$/
 
function authValidation({name,phone,email,password}:authValidationProps):string {
    
    if(name !=undefined){
        if(name.trim()===""){
            return 'Name is required'
        }else if(name.length < 3){
            return "Name must contain 3 letters"
        }
    }
    if(phone!=undefined){
        if(!phone.match(phonePattern)){
            return 'incorrect phone number'
        }
    }
    if(!email.match(emailPattern)){
        return 'incorrect email format'
    }else if (password.length < 6){
        return 'password must contain 6 characters'
    }
    
    return "Success"
}


export default authValidation