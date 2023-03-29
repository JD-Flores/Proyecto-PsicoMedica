import React, { Fragment } from "react";
import { useState } from "react";
import { ProfileNav } from "../../Componentes/ProfileNav/ProfileNav";
import { DOC_DETAIL, RESERVAR_CITA } from "../../constantes/urls";
import Lupa from "../../imagenes/search-line.png";
import ArrowDown from "../../imagenes/arrow-down-s-line.png";
import ArrowUp from "../../imagenes/arrow-up-s-line.png";
import Star from "../../imagenes/Estrella_amarilla.png";
import { searchDoctorsAvailable } from "../../firebase/users-service";
import { DoctorCard } from "../../Componentes/DoctorCard/DoctorCard";
import { searchDoctorsAvailableByName } from "../../firebase/users-service";
import { Link } from "react-router-dom";

export function BuscarDoc() {
  const [isOpenBA, setIsOpenBA] = useState(false);
  const [star, setStar] = useState("vacio");
  const [specialization, setSpecialization] = useState("");
  const [doctorName, setDoctorName] = useState("vacio");
  const [doctors, setDoctors] = useState([]);

  const handleOnChange = (event) => {
    setSpecialization(event.target.value);
  };

  const handleDoctorName = (event) => {
    setDoctorName(event.target.value);
  };

  const searchDoctor = async (star, specialization) => {
    const data = await searchDoctorsAvailable(star, specialization);
    setDoctors(data);
  };

  const searchDoctorsByName = async (doctorName) => {
    const data = await searchDoctorsAvailableByName(doctorName);
    setDoctors(data);
  };

  return (
    <div
      id="main-container"
      className=" flex flex-col justify-center items-center gap-[13px] py-[17px] "
    >
      <div id="top-container" className="">
        <ProfileNav></ProfileNav>
      </div>

      <div
        id="middle-container"
        className="flex flex-row justify-center gap-[5px]"
      >
        <input
          id="buscador"
          onChange={handleDoctorName}
          className="w-[309px] h-[50px] bg-[#FFFFFF] rounded-[12px] p-[13px] 
          md:w-[528px] md:text-[20px]
          lg:w-[628px] 
          xl:w-[708px]"
          placeholder="Introduzca el nombre del doctor"
        ></input>
        <button
          id="buscar"
          onClick={() => searchDoctorsByName(doctorName)}
          className="bg-[#908989] w-[50px] h-[50px] rounded-[12px] flex justify-center items-center"
        >
          <img className="w-[24px] h-[24px]" src={Lupa} alt="" />
        </button>
      </div>

      <div
        id="bottom-container"
        className=" flex flex-col gap-y-[13px] w-full items-center "
      >
        <button
          onClick={() => setIsOpenBA((prev) => !prev)}
          className="flex flex-row justify-between text-white items-center w-[363px] h-[36px] bg-[#908989] rounded-[12px] px-[13px]
          md:w-[583px] md:text-[20px]
          lg:w-[683px] lg:text-[20px]
          xl:w-[763px] xl:text-[20px]"
        >
          Busqueda Avanzada
          {!isOpenBA ? (
            <img className="w-[24px] h-[24px]" src={ArrowDown} alt="" />
          ) : (
            <img className="w-[24px] h-[24px]" src={ArrowUp} alt="" />
          )}
        </button>

        {isOpenBA && (
          <div
            id="sub-main-container"
            className="flex flex-col p-4 w-[363px] bg-white rounded-[12px] 
            md:w-[583px] md:text-[20px]
            lg:w-[683px] 
            xl:w-[763px] "
          >
            <div id="sub-top-container" className="px-[13px] py-[10px]">
              <p className="text-[#908989]">Buscar por:</p>
            </div>

            <div
              id="sub-middle-container"
              className="flex flex-row justify-evenly gap-[5px]"
            >
              <div
                id="ranking"
                className="flex flex-col items-center gap-y-[4px]"
              >
                <p className="flex justify-center text-[#908989] items-center w-[155px] h-[30px] px-[13px] ">
                  Ranking
                </p>
                <div
                  id="stars-selection"
                  className="flex flex-col justify-center items-center w-[165px] h-[95px] bg-[#5974A9] rounded-[12px]
                  md:w-[250px] md:text-lg
                  lg:w-[300px] lg:text-xl
                  xl:w-[350px] xl:text-[22px]"
                >
                  <button
                    id="vacio"
                    onClick={() => setStar("vacio")}
                    className="flex flex-row justify-center items-center h-full w-full hover:bg-[#908989] rounded-[12px]"
                  >
                    <h1 className="text-white">Deseleccionar</h1>
                  </button>
                  <div className="flex items-center flex-row-reverse cursor-pointer gap-0.25 md:gap-2 lg:gap-3 xl:gap-4">
                    <svg
                      aria-hidden="true"
                      onClick={() => setStar(5)}
                      className="w-8 h-8 peer text-gray-300 peer-hover:text-yellow-400 hover:text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      onClick={() => setStar(4)}
                      className="w-8 h-8 peer text-gray-300 peer-hover:text-yellow-400 hover:text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      onClick={() => setStar(3)}
                      className="w-8 h-8 peer text-gray-300 peer-hover:text-yellow-400 hover:text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      onClick={() => setStar(2)}
                      className="w-8 h-8 peer text-gray-300 peer-hover:text-yellow-400 hover:text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      onClick={() => setStar(1)}
                      className="w-8 h-8 peer text-gray-300 peer-hover:text-yellow-400 hover:text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                  <p className="text-base md:text-lg lg:text-xl  font-bold text-white">
                    {star} estrella(s)
                  </p>
                  {/* <button id='1-star' onClick= {() => setStar(1)} className='flex flex-row justify-center items-center h-full w-full hover:bg-[#908989] rounded-[12px]'>
                  <img  className="w-[24px] h-[24px]" src={Star} alt="" />
                </button>
                <button id='2-star' onClick={() => setStar(2)} className='flex flex-row justify-center items-center h-full w-full hover:bg-[#908989] rounded-[12px]'>
                  <img className="w-[24px] h-[24px]" src={Star} alt="" />
                  <img className="w-[24px] h-[24px]" src={Star} alt="" />
                </button>
                <button id='3-star' onClick={() => setStar(3)} className='flex flex-row justify-center items-center h-full w-full hover:bg-[#908989] rounded-[12px]'>
                  <img className="w-[24px] h-[24px]" src={Star} alt="" />
                  <img className="w-[24px] h-[24px]" src={Star} alt="" />
                  <img className="w-[24px] h-[24px]" src={Star} alt="" />
                </button>
                <button id='4-star' onClick={() => setStar(4)} className='flex flex-row justify-center items-center h-full w-full hover:bg-[#908989] rounded-[12px]'>
                  <img className="w-[24px] h-[24px]" src={Star} alt="" />
                  <img className="w-[24px] h-[24px]" src={Star} alt="" />
                  <img className="w-[24px] h-[24px]" src={Star} alt="" />
                  <img className="w-[24px] h-[24px]" src={Star} alt="" />
                </button>
                <button id='5-star' onClick={() => setStar(5)} className='flex flex-row justify-center items-center h-full w-full hover:bg-[#908989] rounded-[12px]'>
                  <img className="w-[24px] h-[24px]" src={Star} alt="" />
                  <img className="w-[24px] h-[24px]" src={Star} alt="" />
                  <img className="w-[24px] h-[24px]" src={Star} alt="" />
                  <img className="w-[24px] h-[24px]" src={Star} alt="" />
                  <img className="w-[24px] h-[24px]" src={Star} alt="" />
                </button> */}
                </div>
              </div>

              <div
                id="especialidad"
                className="flex flex-col items-center gap-y-[4px]"
              >
                <p className="flex justify-center text-[#908989] items-center w-[155px] h-[30px] px-[13px]">
                  Especialidad
                </p>

                <select
                  id="especialidad-selection"
                  onChange={handleOnChange}
                  className="w-[165px] h-[95px] bg-[#5974A9] rounded-[12px] text-white text-xs p-[3px] truncate
                  md:w-[250px] md:text-sm
                  lg:w-[300px] lg:text-base
                  xl:w-[350px] xl:text-lg"
                >
                  <option value=""></option>
                  <option value="Depresión">Depresión</option>
                  <option value="Trastorno bipolar">Trastorno bipolar</option>
                  <option value="Ansiedad">Ansiedad</option>
                  <option value="Trastorno obsesivo-compulsivo">
                    Trastorno obsesivo-compulsivo
                  </option>
                  <option value="Trastorno por estrés postraumático">
                    Trastorno por estrés postraumático
                  </option>
                  <option value="Trastorno por estrés agudo">
                    Trastorno por estrés agudo
                  </option>
                  <option value="Somatización">Somatización</option>
                  <option value="Disfunciones sexuales">
                    Disfunciones sexuales
                  </option>
                  <option value="Abusos sexuales">Abusos sexuales</option>
                  <option value="Dependencia emocional">
                    Dependencia emocional
                  </option>
                  <option value="Insomnio y trastornos del sueño">
                    Insomnio y trastornos del sueño
                  </option>
                  <option value="Trastornos de personalidad">
                    Trastornos de personalidad
                  </option>
                  <option value="Terapia de pareja">Terapia de pareja</option>
                </select>
              </div>
            </div>
            <div
              id="sub-bottom-container"
              className="flex justify-center py-[15px]"
            >
              <button
                id="buscar"
                onClick={() => searchDoctor(star, specialization)}
                className="bg-[#908989] w-[100px] md:w-[125px] h-[50px] rounded-[12px] flex justify-center items-center"
              >
                <img className="w-[24px] h-[24px]" src={Lupa} alt="" />
              </button>
            </div>
          </div>
        )}
        <div id="results" className="w-[363px] md:w-[583px] lg:w-[683px] xl:w-[763px]">
          <div className="flex flex-row flex-wrap justify-between overflow-y-scroll items-center gap-y-5">
            {doctors == null ? (
              <div>No hay resultados para su búsqueda</div>
            ) : (
              doctors?.map((doctor, idx) => (
      
                  <Link to={`/doctors/${doctor.uid}`}>
                    <DoctorCard info={doctor} key={idx} />
                  </Link>
                
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
