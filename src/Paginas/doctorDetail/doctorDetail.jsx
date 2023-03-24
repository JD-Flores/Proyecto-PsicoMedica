import { Link } from "react-router-dom"
import { RESERVAR_CITA } from "../../constantes/urls"
import { useNavigate, useParams } from "react-router";
import { getDoctorById } from "../../firebase/users-service";
import { getDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { DoctorContext } from "../../contexts/DoctorContext";



export function DoctorDetail() {
    const navigate = useNavigate();
    const { doctor_id } = useParams();
    const [doctor, setDoctor] = useState([]);
    const {setDoctorCon} = useContext(DoctorContext)

    const getDoctor= async (id) => {
        const data = await getDoctorById(id);
        setDoctor(data);
      }
    const handleReserve = ()=>{
        console.log('prueba' + doctor.uid)
        setDoctorCon(doctor)
        
        navigate(`/reservas/${doctor.uid}`)
    }

    useEffect(() => {
        const result = getDoctor(doctor_id);
      }, []);


    return(
        <div id="main-container" className="flex flex-col">
            
            <div id="top-container" className="flex flex-row">
                <div id="left-side">
                    <img id="foto">

                    </img>
                    <button>
                        Reservar Cita
                    </button>
                </div>

                <div id="right-side">
                    <hr />
                    <h1>Doctor:</h1>
                    <h2>Nombre: {doctor.name}</h2>
                    <hr />
                    <p>Especialidad: {doctor.specialty}</p>
                    <p>Ranking: {doctor.ranking} estrellas</p>
                    <p>Precio consulta: {doctor.Price}$</p>
                </div>
            </div>
            <hr />
            <div id="middle-container" className="flex flex-row">
                <div id="bio" className="flex flex-col">
                    <h2>Biografia:</h2>
                    <p></p>
                </div>
                <div id="descripcion" className="flex flex-col">
                    <h2>Descripcion:</h2>
                    <p></p>
                </div>
            </div>
            <hr/>
            <div id="bottom-container" className="flex flex-row">
                <div id="feedback">
                    <h2>Feedback:</h2>
                    <p></p>
                </div>
            </div>
            <button onClick={handleReserve}>agendar2</button>
            {/* <Link to={`/reservas/${doctor.uid}`}>Agendar</Link> */}
        </div>
    )
}