import React, { useState } from "react";
import imagenHomepage1 from "../../imagenes/homepage1.png";
import imageVentaja1 from "../../imagenes/img1.jpg";
import imageVentaja2 from "../../imagenes/img2.jpg";
import imageVentaja3 from "../../imagenes/img3.jpg";
import estrella from "../../imagenes/Estrella_amarilla.png";
import imgpreguntas from "../../imagenes/imgpreguntas.jpg";
import Number from "../../Componentes/LandingPage/Number";
import { Dropdown } from "../../Componentes/Dropdown/Dropdown";
import { DoctorCard } from "../../Componentes/DoctorCard/DoctorCard";
import { useEffect } from "react";
import { getDoctorsInfo } from "../../firebase/users-service";
import { useNavigate } from "react-router";
import { BuscarDoc } from "../buscarDoc/BuscarDoc";
import { BUSCAR_DOC, LOGIN_URL } from "../../constantes/urls";
import { useUser } from "../../contexts/UserContext";

export function HomePage() {
  const navigate = useNavigate()
  const [faq1, setFaq1] = useState(false);
  const [faq2, setFaq2] = useState(false);
  const [faq3, setFaq3] = useState(false);
  const [faq4, setFaq4] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const {user} = useUser()

  const getDoctors = async () => {
    const data = await getDoctorsInfo();
    console.log(data);
    setDoctors(data);
  };

  useEffect(() => {
    getDoctors();
  }, []);
  const handleAgendar = ()=>{
    if(user){
      navigate(BUSCAR_DOC)
    }else{
      navigate(LOGIN_URL)
    }
  }

  return (
    <div className="box-border p-0 m-0 scroll-smooth">
      {" "}
      {/*Contenedor principal*/}
      <div className="flex bg-[#5974A9] h-[280px] sm:h-[400px] lg:h-[600px]">
        {" "}
        {/*Primera vista de la Homepage con imagen*/}
        <div className="ml-[20px] leading-normal ">
          {" "}
          {/*Lado izquierdo de la vista*/}
          <h1 className="text-white text-[25px] sm:text-4xl lg:text-6xl mt-[20px] font-alfa-slab-one mb-[5px] sm:mt-[60px] lg:mt-[120px] ">
            PsicoMedica
          </h1>
          <h2 className="text-[17px] sm:text-2xl lg:text-4xl font-alfa-slab-one text-white mb-[10px] sm:mt-[20px]">
            Atención Psicológica Online
          </h2>
          <h4 className="text-[12px] sm:text-xl lg:text-2xl text-white">
            El autocuidado y la salud mental son clave para mantener una vida
            plena y saludable
          </h4>
          <button onClick={handleAgendar} className="text-[12px] sm:text-[16px] lg:text-lg text-white bg-[#EF3D3E] font-comfortaa   border-indigo-500 hover:shadow p-2 rounded-[6px] mt-[15px] mb-[15px]">
            Agendar Cita
          </button>
        </div>
        <div className="flex w-[708px] h-[300px] ">
          {" "}
          {/*Lado derecho de la vista con imagen*/}
          <img
            src={imagenHomepage1}
            alt="Imagen principal de la página"
            className=" w-[400px] h-[200px] sm:h-[250px] sm:w-[700px]  lg:h-[400px] lg:w-[900px] sm:mt-[30px] lg:mt-[70px] items-center justify-center  mt-[17px] "
          />
        </div>
      </div>
      <div className="flex flex-col bg-white items-center justify-center h-[320px] sm:h-[400px]">
        {" "}
        {/*Contenedor de descripción de la app*/}
        <h1 className="text-[17px] sm:text-[28px]  mb-[15px] sm:mb-[40px] font-semibold text-[#5974A9] font-comfortaa">
          Encuentra al psicólogo que se adapte más a ti
        </h1>
        <div className=" flex mt-[-5px] flex-row ml-4 p-4">
          {" "}
          {/*Contenedor de ventajas de la app*/}
          <div className="flex flex-col items-center justify-between ">
            {" "}
            {/*Contenedor de ventaja 1*/}
            <img
              src={imageVentaja1}
              alt="imagen de ventaja 1"
              className="w-[130px] h-[130px] sm:w-[150px] sm:h-[150px]"
            />
            <h1 className="text-[12px] sm:text-[14px] lg:text-[18px]  text-center whitespace-nowrap font-bold font-comfortaa">
              Psicólogos Certificados
            </h1>
            <h3 className="text-[9px] sm:text-[12px] lg:text-[14px] text-center mt-[8px] font-semibold font-comfortaa">
              Nuestra plataforma cuenta con psicólogos certificados y
              capacitados para realizar terapia
            </h3>
          </div>
          <div className="flex flex-col items-center ">
            {" "}
            {/*Contenedor de ventaja 2*/}
            <img
              src={imageVentaja2}
              alt="imagen de ventaja 2 "
              className="w-[130px] h-[130px] sm:w-[150px] sm:h-[150px]"
            />
            <h1 className="text-[12px] sm:text-[14px] lg:text-[18px] text-center whitespace-nowrap font-bold font-comfortaa">
              Terapia a tu alcance
            </h1>
            <h3 className="text-[9px] sm:text-[12px] lg:text-[14px] text-center mt-[8px] font-semibold font-comfortaa">
              {" "}
              La consulta es totalmente Online, podrás contactar a tu psicólogo
              cada vez que lo necesites
            </h3>
          </div>
          <div className="flex flex-col items-center ">
            {" "}
            {/*Contenedor de ventaja 2*/}
            <img
              src={imageVentaja3}
              alt="imagen de ventaja 3"
              className="w-[130px] h-[130px] sm:w-[150px] sm:h-[150px]"
            />
            <h1 className="text-[12px] sm:text-[14px] lg:text-[18px] text-center whitespace-nowrap font-bold font-comfortaa">
              Cómodo y seguro
            </h1>
            <h3 className="text-[9px] sm:text-[12px] lg:text-[14px] text-center mt-[8px] font-semibold font-comfortaa">
              Los datos personales y la información proporcionada al
              especialista se mantendrá en privado y de manera confidencial
            </h3>
          </div>
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-evenly items-center h-fit mt-[30px] p-2  gap-6">
        {doctors?.map((doctor, idx) => (
          <DoctorCard info={doctor} key={idx} />
        ))}
      </div>
      <div className="bg-[#5974A9] flex flex-col text-[16px] mb-5">
        {" "}
        {/*Contenedor de pasos a seguir para usar la app*/}
        <Number
          number="1"
          title="Ingresa tus datos"
          description="Debes registrarte en la plataforma con tus datos personales"
        />
        <Number
          number="2"
          title="Elige a tu psicólogo ideal"
          description="Contamos con psicólogos especializados en diversas áreas"
        />
        <Number
          number="3"
          title="Establece un horario"
          description="Elige un horario que se adecúe a ti"
        />
        <Number
          number="4"
          title="Compra tu sesión"
          description="A través de nuestra plataforma, podrás realizar tu pago por medio de Paypal"
        />
        <div className="mb-2">
          <Number
            number="5"
            title="¡Listo!"
            description="El especialista se pondrá en contacto a traves de nuestro chat personalizado"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center bg-white">
        {" "}
        {/*Contenedor de preguntas frecuentes*/}
        <h1 className="text-[17px] sm:text-[28px]  mt-8 mb-10 text-[#5974A9] text-center font-semibold font-comfortaa">
          Preguntas Frecuentes
        </h1>
        <div className="flex flex box">
          <div className="p-8 font-comfortaa font-bold text-[12px] sm:text-[18px]">
            <div
              onClick={() => {
                setFaq1(!faq1);
              }}
            >
              ¿Cómo puedo agendar una sesión?
              <div
                className={`${
                  faq1
                    ? "opacity-100 visible translate-y-0 duration-500"
                    : "opacity-0 invisible translate-y-[-20px] duration-500"
                }`}
              >
                <Dropdown text={`${faq1 ? "Para agendar una sesión con un especialista de nuestra plataforma, sólo debes estar registrado, de esta manera podrás encontrar a un psicólogo que se adapte a tus necesidades." : ""}`} />
              </div>
            </div>
            <div>
              <div
                onClick={() => {
                  setFaq2(!faq2);
                }}
              >
                ¿Cuánto tiempo duran las sesiones?
                <div
                  className={`${
                    faq2
                      ? "opacity-100 visible translate-y-0 duration-500"
                      : "opacity-0 invisible translate-y-[-20px] duration-500"
                  }`}
                >
                  <Dropdown text={`${faq2 ? "La duración de cada sesión dependerá de la disponibilidad en el horario del especialista. En caso de que esté disponible y el psicólogo lo vea conveniente, podrás ampliar el tiempo de tu sesión." : ""}`} />
                </div>
              </div>
            </div>
            <div>
              <div
                onClick={() => {
                  setFaq3(!faq3);
                }}
              >
                ¿Cuál es el costo de cada sesión?
                <div
                  className={`${
                    faq3
                      ? "opacity-100 visible translate-y-0 duration-500"
                      : "opacity-0 invisible translate-y-[-20px] duration-500"
                  }`}
                >
                  <Dropdown text={`${faq3 ? "Nuestros especialistas eligen el costo de la sesión a realizar. Debes escoger el que mejor se adapte a tus necesidades." : ""}`} />
                </div>
              </div>
            </div>
            <div>
              <div
                onClick={() => {
                  setFaq4(!faq4);
                }}
              >
                ¿Qué tipo de problemas se pueden tratar con este servicio?
                <div
                  className={`${
                    faq4
                      ? "opacity-100 visible translate-y-0 duration-500"
                      : "opacity-0 invisible translate-y-[-20px] duration-500"
                  }`}
                >
                  <Dropdown text={`${faq4 ? "Contamos con un gran número de psicólogos especializados en distintas áreas. Por ejemplo: Depresión, Ansiedad, Dependencia Emocional, Terapia de pareja, entre otros. Puedes realizar terapia a largo plazo con un mismo especialista." : ""}`} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex box w-[600px] h-[300px] ">
            {" "}
            {/*Lado derecho de la vista con imagen*/}
            <img
              src={imgpreguntas}
              alt="Imagen"
              className=" w-[300px] h-[200px] sm:h-[250px] sm:w-[600px] lg:h-[300px] lg:w-[420px] lg:ml-[150px] mt-[17px] lg:mt-[1px]"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center bg-white h-[180px]">
        {" "}
        {/*Contenedor de calificación*/}
        <h1 className="text-[30px] sm:text-[35px] mt-[30px] font-bold">4,9/5</h1>
        <div className="flex flex-row w-[25px] justify-center mt-1">
          <img src={estrella} alt="" />
          <img src={estrella} alt="" />
          <img src={estrella} alt="" />
          <img src={estrella} alt="" />
          <img src={estrella} alt="" />
        </div>
        <p className="mt-1 text-[12px] sm:text-[16px]">Valoración global de las sesiones</p>
      </div>
    </div>
  );
}
