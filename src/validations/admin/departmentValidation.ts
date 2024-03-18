import { departmentVlidation } from "../../types/adminTypes";

export function departmentValidation({name,title,description,logo,image}:departmentVlidation):string{
  if(!name){
    return "Name is required"
  }else if(name.length < 3){
    return "Name must contain 3 character"
  }else if(!title){
    return "Title is required"
  }else if(title.length < 3){
    return "title must contain 3 character"
  }else if(!description){
    return "description is required"
  }else if(description.length < 3){
    return "description must contain 3 character"
  }else if(!logo){
    return "logo is required"
  }else if(!image){
    return "image is required"
  }else{
    return "Success"
  }
}