import { Link } from "react-router-dom";
import { RESERVAR_CITA } from "../../constantes/urls";
import { useNavigate, useParams } from "react-router";
import { getDoctorById } from "../../firebase/users-service";
import { getDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { docContext, DoctorContext } from "../../contexts/DoctorContext";

export function DoctorDetail() {
  const navigate = useNavigate();
  const { doctor_id } = useParams();
  const [doctor, setDoctor] = useState([]);
  const [context, setContext] = useContext(docContext);

  const getDoctor= async (id) => {
      const data = await getDoctorById(id);
      setDoctor(data);
    }
  const handleReserve = ()=>{
      setContext(doctor)

      navigate(`/reservas/${doctor.uid}`)
  }

  useEffect(() => {
      const result = getDoctor(doctor_id);
    }, []);

  return (
    <div
      id="main-container"
      className="sm:w-[650px] mx-auto m-8 bg-white p-10 rounded-xl shadow shadow-slate-300 h-fit mt-10"
    >
      <div id="top-container" className="flex flex-row">
        <div id="left-side" className="flex flex-col text-justify ">
          <img id="foto" alt="foto" src={doctor.profilePic} className="w-[250px] h-[220px] mb-4"/>
          <button
          onClick={handleReserve}
          className="cursor-pointer flex items-center justify-center bg-[#5974A9] text-white p-1 rounded-md h-10 w-[180px] text-center text-sm font-medium">
            Reservar Cita
          </button>
        </div>

        <div id="right-side" className="flex flex-col gap-[6px] lg:ml-[100px] ml-[50px]">
            <hr className="border-t-8 border-[#5974A9] mt-2"/>
            <h1 className="text-[#5974A9] text-3xl font-bold font-comfortaa">
              Doctor
            </h1>
            <h2 className="font-bold text-2xl font-comfortaa"> {doctor.name} {doctor.lastname}</h2>
            <hr className="border-t-8 border-[#5974A9] mt-2"/>
            <p className="text-[#5974A9] text-base font-bold font-comfortaa">
              Especialidad:
            </p>
            <p className="text-base font-bold font-comfortaa"> {doctor.specialty}</p>
            <p className="text-[#5974A9] text-base font-bold font-comfortaa">Ranking:</p>
            <p className="text-base font-bold font-comfortaa"> {doctor.ranking} estrellas</p>
              
            
            <p className="text-[#5974A9] text-base font-bold font-comfortaa">
              Precio consulta: 
            </p>
            <p className="text-base font-bold font-comfortaa">
            ${doctor.Price} por hora
            </p>
            
          </div>
      </div>

      <hr className="border-t-8 border-[#5974A9] mt-2"/>

      <div id="middle-container" className="flex flex-row">
        <div id="bio" className="flex flex-col p-2 text-justify">
          <h2 className="text-[#5974A9] text-[18px] font-comfortaa font-bold">Biografía:</h2>
          <p className="font-comfortaa text-[14px]">{doctor.biography}</p>
        </div>
      </div>

      <hr className="border-t-8 border-[#5974A9] mt-2"/>
      <div id="bottom-container" className="flex flex-col mt-2 p-2 text-justify">
        <div id="feedback">
          <h2 className="text-[#5974A9] text-[18px]  font-comfortaa font-bold">Feedback:</h2>
          <p className="font-comfortaa text-[14px]"></p>
        </div>
      </div>
    </div>
  );
}
