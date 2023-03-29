import React, { useState } from "react";
import { Calendario } from "../../Componentes/Calendario/Calendario";
import { DoctorNav } from "../../Componentes/ProfileNav/DoctorNav";
import { useUser } from "../../contexts/UserContext";

export default function DoctorCalendarPage() {
  const { user } = useUser();
  const [uid, SetUid] = useState(user.uid);

  return (
    <div id="main-container" className="flex flex-col justify-center items-center gap-[13px] py-[17px]">
      
      <div id="top-container">
        <DoctorNav></DoctorNav>
      </div>
      
      <div id="bottom-container">
        <div className="bg-white rounded-[12px] w-[363px] p-2 
        md:w-[583px]
        lg:w-[683px]
        xl:w-[763px]">
          <Calendario userid={uid} />
        </div>
      </div>
    </div>
  );
}
