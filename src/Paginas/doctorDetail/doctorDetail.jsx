import { Link } from "react-router-dom";
import { RESERVAR_CITA } from "../../constantes/urls";
import { useNavigate, useParams } from "react-router";
import { getDoctorById } from "../../firebase/users-service";
import { getDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { docContext, DoctorContext } from "../../contexts/DoctorContext";

export function DoctorDetail() {
  // const navigate = useNavigate();
  // const { doctor_id } = useParams();
  // const [doctor, setDoctor] = useState([]);
  // const [context, setContext] = useContext(docContext);

  // const getDoctor= async (id) => {
  //     const data = await getDoctorById(id);
  //     setDoctor(data);
  //   }
  // const handleReserve = ()=>{
  //     setContext(doctor)

  //     navigate(`/reservas/${doctor.uid}`)
  // }

  // useEffect(() => {
  //     const result = getDoctor(doctor_id);
  //   }, []);

  return (
    <div
      id="main-container"
      className="max-w-lg mx-auto m-8 bg-white p-10 rounded-xl shadow shadow-slate-300 h-fit mt-10"
    >
      <div id="top-container" className="flex flex-row">
        <div id="left-side" className="flex flex-col text-justify">
          <img id="foto" alt="foto" />
          <button className="cursor-pointer flex items-center justify-center bg-[#5974A9] text-white p-1 rounded-md h-10 w-[180px] text-center text-sm font-medium">
            Reservar Cita
          </button>
        </div>

        <div id="right-side" className="flex flex-col gap-[8px] ml-[50px]   sm:ml-[65px]">
            <hr />
            <h1 className="text-[#5974A9] text-3xl font-bold font-comfortaa">
              Doctor
            </h1>
            <h2 className="font-bold text-2xl font-comfortaa">Albany Avila</h2>
            {/* <h2 className="font-bold text-2xl font-comfortaa">: {doctor.name}</h2> */}
            <hr />
            <p className="text-[#5974A9] text-base font-bold font-comfortaa">
              Especialidad: depresión
            </p>
            {/* <p className="text-[#5974A9] text-base font-bold font-comfortaa">: {doctor.specialty}</p> */}
            <p className="text-[#5974A9] text-base font-bold font-comfortaa">
              Ranking
            </p>
            <p className="text-[#5974A9] text-base font-bold font-comfortaa">
              Precio consulta
            </p>
            {/* <p>Ranking: {doctor.ranking} estrellas</p> */}
            {/* <p>Precio consulta: {doctor.Price}$ por hora</p> */}
          </div>
      </div>

      <hr />

      <div id="middle-container" className="flex flex-row">
        <div id="bio" className="flex flex-col p-2 text-justify">
          <h2 className="text-[#5974A9] text-[18px] font-comfortaa font-bold">Biografía:</h2>
          <p className="font-comfortaa text-[14px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique eius obcaecati itaque quasi ullam deserunt ratione eum laboriosam magni ipsum commodi quibusdam numquam vel accusamus, vero repellendus, molestiae quaerat quod.</p>
        </div>
        <div id="descripcion" className="flex flex-col p-2 ml-2 text-justify">
          <h2  className="text-[#5974A9] text-[18px]  font-comfortaa font-bold">Descripción:</h2>
          <p className="font-comfortaa text-[14px]">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit et iste, iure dolor illo fuga, officiis ut quia laboriosam commodi voluptas dignissimos labore repellat atque nam. Ipsa at veniam minima.</p>
        </div>
      </div>

      <hr />
      <div id="bottom-container" className="flex flex-col ml-2 mt-2 text-justify">
        <div id="feedback">
          <h2 className="text-[#5974A9] text-[18px]  font-comfortaa font-bold">Feedback:</h2>
          <p className="font-comfortaa text-[14px]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est labore, illo eum asperiores deleniti nisi nihil blanditiis tempora rem quod optio saepe minus maxime repellendus perspiciatis laboriosam aspernatur nobis. Ducimus!</p>
        </div>
      </div>
      {/* <button onClick={handleReserve}>agendar2</button>
            <Link to={`/reservas/${doctor.uid}`}>Agendar</Link> */}
    </div>
  );
}
