import React, { useState } from "react";
import imagenHomepage1 from "../../imagenes/homepage1.png";
import imageVentaja1 from "../../imagenes/img1.jpg";
import imageVentaja2 from "../../imagenes/img2.jpg";
import imageVentaja3 from "../../imagenes/img3.jpg";
import estrella from "../../imagenes/Estrella_amarilla.png";
import Number from "../../Componentes/LandingPage/Number";
import { DoctorCard } from "../../Componentes/DoctorCard/DoctorCard";
import { useEffect } from "react";
import { getDoctorsInfo } from "../../firebase/users-service";
import { useNavigate } from "react-router";
import { BuscarDoc } from "../buscarDoc/BuscarDoc";
import { BUSCAR_DOC, LOGIN_URL } from "../../constantes/urls";
import { useUser } from "../../contexts/UserContext";
import { FAQ } from "../../Componentes/FAQ/FAQ";

export function HomePage() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const { user } = useUser();

  const getDoctors = async () => {
    const data = await getDoctorsInfo();
    console.log(data);
    setDoctors(data);
  };

  useEffect(() => {
    getDoctors();
  }, []);
  const handleAgendar = () => {
    if (user) {
      navigate(BUSCAR_DOC);
    } else {
      navigate(LOGIN_URL);
    }
  };

  return (
    <div className="box-border p-0 m-0 scroll-smooth">
      {" "}
      {/*Sección principal*/}
      <section className="contenedor-principal" id="inicio-info">
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
            <button
              onClick={handleAgendar}
              className="text-[12px] sm:text-[16px] lg:text-lg text-white bg-[#EF3D3E] font-comfortaa   border-indigo-500 hover:shadow p-2 rounded-[6px] mt-[15px] mb-[15px]"
            >
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
        <svg
          viewBox="0 0 1440 85"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_6_37)">
            <path d="M1440 0H1.22156V71.3532H1440V0Z" fill="#5974A9" />
            <path
              d="M1439.19 57.8445C1419.04 58.1685 1398.64 58.4529 1377.98 58.6981C1154.35 61.325 902.814 58.462 740.248 49.9574C628.837 44.1257 566.263 36.2643 484.459 29.2045C402.655 22.1447 285.87 15.3217 130.746 14.0279C89.5299 13.6865 40.9991 13.5021 0.00744629 12.8979V84.9934H1439.09L1439.19 57.8445Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_6_37">
              <rect width="1440" height="85" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </section>
      {/*Sección descripción de la app*/}
      <section className="segundo-contenedor" id="descrip-app">
        <div
          className="flex flex-col bg-white items-center justify-center h-[320px] sm:h-[400px]"
          id="ventajas"
          name="ventajas"
        >
          {" "}
          <h1 className="text-[17px] sm:text-[22px] lg:text-[28px] mb-[15px] sm:mb-[40px] font-semibold text-[#5974A9] font-comfortaa">
            Encuentra al psicólogo que se adapte más a ti
          </h1>
          <div className=" flex mt-[-5px] flex-row ml-2 p-2 space-x-4">
            {" "}
            {/*Contenedor de ventajas de la app*/}
            <div className="flex flex-col items-center justify-between">
              {" "}
              {/*Contenedor de ventaja 1*/}
              <img
                src={imageVentaja1}
                alt="imagen de ventaja 1"
                className="w-[130px] h-[130px] sm:w-[150px] sm:h-[150px]"
              />
              <h1 className="text-[12px] sm:text-[14px] lg:text-[18px] text-center whitespace-nowrap font-bold font-comfortaa">
                Psicólogos Certificados
              </h1>
              <h3 className="text-[9px] sm:text-[12px] lg:text-[14px] text-center mt-[8px] font-semibold font-comfortaa">
                Nuestra plataforma cuenta con psicólogos certificados y
                capacitados para realizar terapia
              </h3>
            </div>
            <div className="flex flex-col items-center justify-between">
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
                La consulta es totalmente Online, podrás contactar a tu
                psicólogo cada vez que lo necesites
              </h3>
            </div>
            <div className="flex flex-col items-center justify-between">
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
        <svg
          viewBox="0 0 1440 85"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_8_55)">
            <path
              d="M4.57764e-05 85L1438.78 85V13.6468L4.57764e-05 13.6468V85Z"
              fill="#5974A9"
            />
            <path
              d="M0.809353 27.1555C20.958 26.8315 41.3615 26.547 62.0197 26.3019C285.653 23.6749 537.186 26.538 699.752 35.0426C811.164 40.8743 873.738 48.7357 955.541 55.7955C1037.34 62.8553 1154.13 69.6783 1309.25 70.972C1350.47 71.3135 1399 71.4979 1439.99 72.1021V0.00652989L0.91437 0.00652989L0.809353 27.1555Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_8_55">
              <rect
                width="1440"
                height="85"
                fill="white"
                transform="matrix(-1 0 0 -1 1440 85)"
              />
            </clipPath>
          </defs>
        </svg>
      </section>
      {/* Sección doctores e info de reservar cita */}
      <section className="tercer-contenedor" id="info-docs">
        <div className="flex flex-row flex-wrap justify-evenly items-center h-fit mt-[30px] p-2  gap-6">
          {doctors?.map((doctor, idx) => (
            <DoctorCard info={doctor} key={idx} />
          ))}
        </div>

        <div className="bg-[#5974A9] flex flex-col font-semibold text-[13px] lg:text-[18px] mb-5">
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
      </section>
      {/* Sección valoraciones página */}
      <section >

      <div className="flex flex-col items-center bg-white">
          <h1 className="text-[30px] sm:text-[35px] font-bold mt-6">4,9/5</h1>
          <div className="flex flex-row w-[25px] justify-center mt-1">
            <img src={estrella} alt="" />
            <img src={estrella} alt="" />
            <img src={estrella} alt="" />
            <img src={estrella} alt="" />
            <img src={estrella} alt="" />
          </div>
          <p className="text-[12px] sm:text-[16px]">
            Valoración global de las sesiones
          </p>
          <svg
            viewBox="0 0 1440 389"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1440 0H0V388.319H1440V0Z" fill="white" />
            <path
              d="M1439.99 0H1439.83C1277.74 2.88052 1114.97 46.6639 1013.39 116.805C981.347 138.927 954.85 163.382 923.283 185.706C855.948 233.35 762.918 271.49 656.389 284.654C549.86 297.818 430.04 283.502 352.588 240.841C299.511 211.604 269.706 172.226 230.736 136.825C191.766 101.423 136.124 67.2309 62.2497 60.7497C42.6223 59.0214 19.4999 58.1285 0 54.9887V388.727H1440L1439.99 0Z"
              fill="#5974A9"
            />
            <path
              d="M1440 359.184C1419.84 360.383 1399.43 361.422 1378.76 362.3C1155.01 371.876 903.294 361.444 740.646 330.479C629.167 309.279 566.561 280.697 484.705 254.98C402.848 229.264 285.969 204.467 130.813 199.762C89.5661 198.508 41.0145 197.86 0 195.581V388.727H1440V359.184Z"
              fill="#6CEACA"
            />
          </svg>
        </div>
      </section>
    </div>
  );
}
