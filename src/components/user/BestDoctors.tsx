// import { useEffect, useState } from "react";
// import { getBestDoctors } from "../../api/doctor/doctorApi";
// import { DoctorData } from "../../types/doctorTypes";

function BestDoctors() {

    return (
        <section className="py-12 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold mb-8">Top Instructors</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 border rounded">
                <img src="instructor1.jpg" alt="Instructor 1" className="mb-4 w-32 h-32 object-cover rounded-full mx-auto" />
                <h3 className="font-bold text-xl">Instructor 1</h3>
              </div>
              <div className="p-4 border rounded">
                <img src="instructor2.jpg" alt="Instructor 2" className="mb-4 w-32 h-32 object-cover rounded-full mx-auto" />
                <h3 className="font-bold text-xl">Instructor 2</h3>
              </div>
              <div className="p-4 border rounded">
                <img src="instructor3.jpg" alt="Instructor 3" className="mb-4 w-32 h-32 object-cover rounded-full mx-auto" />
                <h3 className="font-bold text-xl">Instructor 3</h3>
              </div>
            </div>
          </div>
        </section>
      );
    
}

export default BestDoctors
