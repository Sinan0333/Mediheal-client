import { useState } from "react"
import Inputs from "./Inputs"
import RoundedImageInput from "../common/RoundedImageInput"


function AddDepartmentForm() {
  const [name ,setName] = useState()
  const [title,setTitle] = useState()
  const [description,setDescription] = useState()
  const [logo,setLogo] = useState()
  const [image,setImage] = useState()

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
    </div>
  )
}

export default AddDepartmentForm
