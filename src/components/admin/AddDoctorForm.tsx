import Inputs from "./Inputs"

function AddDoctorForm() {
  return (
    <div className="neumorphic py-2 px-2 ml-6 w-screen pl-4 pt-4">
    <h1 className="text-xl sm:text-2xl md:text-3xl mb-6 font-bold text-adminGold">Add Doctor</h1>
    <div className=" flex flex-wrap">
        <Inputs name="First Name" type="text"/>
        <Inputs name="Second Name" type="text"/>
        <Inputs name="DOB" type="date"/>
        <Inputs name="Age" type="number"/>
        <Inputs name="Gender" type="text"/>
        <Inputs name="Address" type="text"/>
        <Inputs name="Experience" type="number"/>
        <Inputs name="Phone" type="number"/>
        <Inputs name="Email" type="email"/>
        <Inputs name="Department" type="text"/>
        <Inputs name="Working Days" type="text"/>
        <Inputs name="Time" type="time"/>
        <Inputs name="Image" type="file"/>
    </div>
    <div className="flex justify-center">
        <button className="neumorphic-navBtn w-24 h-8 font-semibold text-adminBlue">Submit</button>
      </div>
  </div>
  )
}

export default AddDoctorForm
