import { Link } from "react-router-dom";
import { RESERVAR_CITA } from "../../constantes/urls";
import { useNavigate, useParams } from "react-router";
import { getDoctorById } from "../../firebase/users-service";
import { getDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { docContext, DoctorContext } from "../../contexts/DoctorContext";
import { Calendario } from "../../Componentes/Calendario/Calendario";
import { ProfileNav } from "../../Componentes/ProfileNav/ProfileNav";

export function DoctorDetail() {
  const navigate = useNavigate();
  const { doctor_id } = useParams();
  const [doctor, setDoctor] = useState([]);
  const [context, setContext] = useContext(docContext);

  const getDoctor = async (id) => {
    const data = await getDoctorById(id);
    setDoctor(data);
  };
  const handleReserve = () => {
    setContext(doctor);

    navigate(`/reservas/${doctor.uid}`);
  };

  useEffect(() => {
    const result = getDoctor(doctor_id);
  }, []);

  return (
    <div
      id="main-container"
      className="flex flex-col justify-center items-center gap-[13px] py-[17px] "
    >
      <div id="top-container">
        <ProfileNav></ProfileNav>
      </div>
      <div
        id="bottom-container"
        className="flex flex-col justify-center w-[363px] p-[17px] bg-white rounded-[12px] 
        md:w-[583px] md:text-[]
        lg:w-[683px] lg:text-[]
        xl:w-[763px] xl:text-[]"
      >
        <div id="sub-top-container" className="flex flex-row gap-[13px]">
          <div
            id="leftSideFotoReserva"
            className="flex flex-col w-1/2  gap-[8px]
            md:w-2/5 
            lg:w-2/5 
            xl:w-2/5 "
          >
            <img
              id="foto"
              alt="foto"
              src={doctor.profilePic}
              className="h-[210px] md:h-[250px]  md:w-screen rounded-[12px]"
            />
            <button
              onClick={handleReserve}
              className="flex justify-center items-center cursor-pointer bg-[#5974A9] text-white rounded-[12px] h-[38px] w-full text-center text-sm font-medium md:text-base lg:text-lg xl:text-xl"
            >
              Reservar Cita
            </button>
          </div>

          <div
            id="rightSideInfoDoc"
            className="flex flex-col gap-[6px] w-1/2
            md:w-3/5 
            lg:w-3/5 
            xl:w-3/5 "
          >
            <hr className="border-t-8 border-[#1E1E1E] w-full" />
            <h1
              className="text-[#5974A9] text-base font-bold font-comfortaa
              md:text-lg
              lg:text-xl
              xl:text-xl"
            >
              Doctor
            </h1>
            <h2 className="font-bold text-lg font-comfortaa
              sm:text-xl
              lg:text-2xl
              xl:text-2xl">
              {" "}
              {doctor.name} {doctor.lastname}
            </h2>
            <hr className="border-t-8 border-[#1E1E1E]" />
            <p
              className="text-[#5974A9] text-sm font-bold font-comfortaa
              md:text-lg
              lg:text-xl
              xl:text-xl"
            >
              Especialidad:
            </p>
            <p className="text-base font-bold font-comfortaa
              sm:text-lg
              lg:text-xl
              xl:text-xl">
              {" "}
              {doctor.specialty}
            </p>
            <p className="text-[#5974A9] text-sm font-bold font-comfortaa
              md:text-lg
              lg:text-xl
              xl:text-xl">
              Ranking:
            </p>
            <p className="text-base font-bold font-comfortaa
              sm:text-lg
              lg:text-xl
              xl:text-xl">
              {" "}
              {doctor.ranking} estrella(s)
            </p>

            <p className="text-[#5974A9] text-sm font-bold font-comfortaa
              md:text-lg
              lg:text-xl
              xl:text-xl">
              Precio consulta:
            </p>
            <p className="text-base font-bold font-comfortaa
              sm:text-lg
              lg:text-xl
              xl:text-xl">
              ${doctor.Price} por hora
            </p>
          </div>
        </div>

        <div id="sub-middle-container">
          <hr className="border-t-8 border-[#1E1E1E] mt-2 w-full" />

          <div id="bio" className="flex flex-col p-2 text-justify">
            <h2 className="text-[#5974A9] text-base font-comfortaa font-bold 
              md:text-lg
              lg:text-xl
              xl:text-xl">
              Biografía:
            </h2>
            <p className="font-comfortaa text-base 
              md:text-lg
              lg:text-xl
              xl:text-xl">
              {doctor.biography}
            </p>
          </div>

          <hr className="border-t-8 border-[#1E1E1E] mt-2 w-full" />

          <div
            id="feedback"
            className="flex flex-col p-2 text-justify overflow-y-scroll"
          >
            <h2 className="text-[#5974A9] text-base  font-comfortaa font-bold
              md:text-lg
              lg:text-xl
              xl:text-xl">
              Feedback:
            </h2>
            <p className="font-comfortaa text-base
              md:text-lg
              lg:text-xl
              xl:text-xl"></p>
          </div>

          <hr className="border-t-8 border-[#1E1E1E] mt-2 w-full" />
        </div>

        <div
          id="sub-bottom-container"
          className="flex flex-col p-2 text-justify"
        >
          <div id="agenda">
            <h2 className="text-[#5974A9] text-base  font-comfortaa font-bold mb-2
              md:text-lg
              lg:text-xl
              xl:text-xl">
              Agenda:
            </h2>
            <Calendario userid={doctor_id} />
          </div>
        </div>
      </div>
    </div>
  );
}
