import { PrescriptionPopulateData } from "../../types/doctorTypes"
type ViewPrescriptionsProps = {
    prescription:PrescriptionPopulateData
}

function ViewPrescriptions({prescription}:ViewPrescriptionsProps) {
    
  return (
    <div className="w-full  border-black border mt-4">
        <div className="flex justify-center mt-2">
            <h1 className="text-xl font-bold ">{prescription.doctor.firstName} {prescription.doctor.secondName}</h1>
        </div>
        <div className="p-4 mt-2 flex justify-between">
            <div>
                <div className="flex  pr-2 ">
                    <p className="font-semibold text-lg  mr-4 ">Weight:</p>
                    <p className="text-lg font-semibold">{prescription.weight}</p>
                </div>
                <div className="flex  pr-2 ">
                    <p className="font-semibold text-lg  mr-4 ">Height:</p>
                    <p className="text-lg font-semibold">{prescription.height}</p>
                </div>
                <div className="flex pr-2 w-full">
                    <p className="font-semibold text-lg  mr-4 ">Blood pressure:</p>
                    <p className="text-lg font-semibold">{prescription.bloodPressure}</p>
                </div>
                <div className="flex pr-2 ">
                    <p className="font-semibold text-lg  mr-4 ">Body temperature:</p>
                    <p className="text-lg font-semibold">{prescription.bodyTemperature}</p>
                </div>
            </div>
            <div className="">
                <div className="flex">
                    <p className="font-semibold text-lg w-20">Date:</p>
                    <p className="text-lg font-semibold w-full">{new Date(prescription.appointment.bookedDate).toDateString()}</p>
                </div>
                <div className="flex">
                    <p className="font-semibold text-lg w-20">Time:</p>
                    <p className="text-lg font-semibold w-full">{prescription.appointment.startTime} - {prescription.appointment.endTime}</p>
                </div>
            </div>
        </div>
        <div className="p-4">
            <h1 className="text-xl font-bold">Diagnosis</h1>
            <div>
                {
                    prescription.diagnosis.map((diagnosis)=>(
                        <div className="flex">
                            <p className="font-semibold text-lg mr-2">{diagnosis.name}:</p>
                            <p className="text-lg font-semibold w-full">{diagnosis.instruction}</p>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className="p-4">
            <h1 className="text-xl font-bold">Medicines</h1>
            <div>
                {
                    prescription.medicines.map((medicine)=>(
                        <div className="mb-6">
                            <div className="flex">
                                <p className="font-semibold text-lg mr-2">Name:</p>
                                <p className="text-lg font-semibold w-[90%] break-words">{medicine.name}</p>
                            </div>
                            <div className="flex">
                                <p className="font-semibold text-lg mr-2">Type:</p>
                                <p className="text-lg font-semibold  w-[90%] break-words">{medicine.type}</p>
                            </div>
                            <div className="flex">
                                <p className="font-semibold text-lg mr-2">Days:</p>
                                <p className="text-lg font-semibold w-full">{medicine.days}</p>
                            </div>
                            <div className="flex ">
                                <p className="font-semibold text-lg mr-2 ">Instructions:</p>
                                <p className="text-lg font-semibold  w-[90%] break-words">{medicine.instruction}</p>
                            </div>
                        </div>
                        
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default ViewPrescriptions
