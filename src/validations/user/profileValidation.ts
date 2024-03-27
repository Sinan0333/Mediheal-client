import { ProfileValidationProps } from "../../types/userTypes";

const emailPattern : RegExp =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const phonePattern : RegExp = /^\+?\d{10}$/
 
export function editProfileValidation({name,phone,email,password,newPassword}:ProfileValidationProps):string {
    
    if(name?.length < 3) return "Name must contain 3 letters"
    if(!phone.match(phonePattern)) return 'incorrect phone number'
    if(!email.match(emailPattern)) return 'incorrect email format'

    if(password){
        if(password.length < 6) return 'password must contain 6 characters'
        if(!newPassword) return "New Password is required"
        if(newPassword.length < 6) return 'New password must contain 6 characters'
    }

    return "Success"
}


