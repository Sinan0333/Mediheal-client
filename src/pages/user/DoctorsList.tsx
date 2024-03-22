import DoctorCard from "../../components/user/DoctorCard"
import Nav from "../../components/user/Nav"


function DoctorsList() {
  return (
   <>
   <Nav/>
   <div className="flex justify-center mt-5 mb-6">
        <h1 className="font-bold text-4xl text-adminBlue ">Our Doctors</h1>
   </div>
   <div className="flex justify-center">
    <div className="ml-20 mr-20 flex flex-wrap overflow-x-auto justify-evenly">
            <DoctorCard/>
            <DoctorCard/>
            <DoctorCard/>
            <DoctorCard/>
            <DoctorCard/>
            <DoctorCard/>
    </div>
   </div>
   </>
  )
}

export default DoctorsList
