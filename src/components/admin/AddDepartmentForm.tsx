import { useState } from "react"
import Inputs from "./Inputs"
import RoundedImageInput from "../common/RoundedImageInput"
import { departmentValidation } from "../../validations/admin/departmentValidation"
import { notifyError, notifySuccess } from "../../constants/toast"
import { base64 } from "../../constants/convert"


function AddDepartmentForm() {
  const [name ,setName] = useState()
  const [title,setTitle] = useState()
  const [description,setDescription] = useState()
  const [logo,setLogo] = useState()
  const [image,setImage] = useState()

  async function handleSubmit() {
    const validation: string = departmentValidation({ name, title, description, logo, image });
    if (validation !== "Success") {
      return notifyError(validation);
    }
  
    try {
      const logoBase64 = await base64(logo);
      const imageBase64 = await base64(image);
      console.log(logoBase64, imageBase64);
      notifySuccess(validation);
    } catch (error) {
      console.error(error);
      notifyError("Error occurred while converting images.");
    }
  }
  

  return (
    <div className="neumorphic py-2 px-2 ml-6 w-screen pl-4 pt-4">
      <h1 className="text-xl sm:text-2xl md:text-3xl mb-4 font-bold text-adminGold">Add Department</h1>
      <div className="mb-6 ">
       <Inputs name="Name" type="text" setState={setName} state={name}/>
       <Inputs name="Title" type="text" setState={setTitle} state={title}/>
       <Inputs name="Description" type="text" setState={setDescription} state={description}/>
       <RoundedImageInput state={logo} setState={setLogo} name="logo"/>
       <RoundedImageInput state={image} setState={setImage} name="image"/>
      </div>
      <div className="flex justify-center">
        <button className="neumorphic-navBtn w-24 h-8 font-semibold text-adminBlue" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default AddDepartmentForm
