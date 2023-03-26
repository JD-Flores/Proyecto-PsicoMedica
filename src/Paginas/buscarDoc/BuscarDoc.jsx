import React, { Fragment } from 'react'
import { useState } from "react";
import { ProfileNav } from '../../Componentes/ProfileNav/ProfileNav'
import { DOC_DETAIL, RESERVAR_CITA } from '../../constantes/urls'
import Lupa from "../../imagenes/search-line.png";
import ArrowDown from "../../imagenes/arrow-down-s-line.png";
import ArrowUp from "../../imagenes/arrow-up-s-line.png";
import Star from "../../imagenes/Estrella_amarilla.png";
import { searchDoctorsAvailable } from '../../firebase/users-service';
import { DoctorCard } from '../../Componentes/DoctorCard/DoctorCard';
import { searchDoctorsAvailableByName } from '../../firebase/users-service';
import { Link } from 'react-router-dom';


export function BuscarDoc() {
  const [isOpenBA, setIsOpenBA] = useState(false)
  const [star, setStar]  = useState("vacio");
  const [specialization, setSpecialization] = useState("vacio");
  const [doctorName, setDoctorName] = useState("vacio");
  const [doctors, setDoctors] = useState([]);

  const handleOnChange = (event) => {
      setSpecialization(event.target.value);
  }

  const handleDoctorName = (event) =>{
    setDoctorName(event.target.value)
  }


  const searchDoctor= async (star, specialization) => {
    const data = await searchDoctorsAvailable(star, specialization);;
    setDoctors(data);

  }

  const searchDoctorsByName= async (doctorName) => {
    const data = await searchDoctorsAvailableByName(doctorName);
    setDoctors(data)
  }



  
  return (
    <div id='main-container' className=' flex flex-col justify-center items-center gap-[13px] py-[17px] '>
      <div>{user.name}</div>
      <div id='top-container'className=''>
        <ProfileNav></ProfileNav>
      </div>
      
      <div id='middle-container' className='flex flex-row justify-center gap-[5px]'>
        <input id='buscador' onChange={handleDoctorName} className='w-[309px] h-[50px] bg-[#FFFFFF] rounded-[12px] p-[13px]' placeholder='Introduzca el nombre del doctor'></input>
        <button id='buscar' onClick={() => searchDoctorsByName(doctorName)} className='bg-[#908989] w-[50px] h-[50px] rounded-[12px] flex justify-center items-center'><img className="w-[24px] h-[24px]" src={Lupa} alt="" /></button>
        


      </div>
      
      <div id="bottom-container" className=" flex flex-col gap-y-[13px] w-full items-center ">
      <button onClick={() => setIsOpenBA((prev) => !prev)} className="flex flex-row justify-between text-white items-center w-[363px] h-[36px] bg-[#908989] rounded-[12px] px-[13px]">
        Busqueda Avanzada
        {!isOpenBA ? (
          <img className="w-[24px] h-[24px]" src={ArrowDown} alt="" />
        ) : (
          <img className="w-[24px] h-[24px]" src={ArrowUp} alt="" />
        )}
      </button>

      {isOpenBA && (
        <div id='sub-main-container' className="flex flex-col w-[363px] h-[225px]  bg-white rounded-[12px] ">
          <div id='sub-top-container' className='px-[13px] py-[10px]'>
            <p className="text-[#908989]">Buscar por:</p>
          </div>

          <div id='sub-bottom-container' className='flex flex-row justify-center  gap-x-[20px] '>
            <div id='ranking'className='flex flex-col gap-y-[4px]'>
              <p className="flex justify-center text-[#908989] items-center w-[155px] h-[30px] px-[13px] ">Ranking</p>
              <div id='stars-selection' className='flex flex-col justify-center items-center w-[155px] h-[130px] bg-[#5974A9] rounded-[12px] '>
                <button id='1-star' onClick= {() => setStar(1)} className='flex flex-row justify-center items-center h-full w-full hover:bg-[#908989] rounded-[12px]'>
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
                </button>
              </div>

            </div>

            <div id='especialidad' className='flex flex-col gap-y-[4px]'>
              <p className="flex justify-center text-[#908989] items-center w-[155px] h-[30px] px-[13px]">Especialidad</p>

              <select id='especialidad-selection'onChange={handleOnChange} className='w-[155px] h-[50px] bg-[#5974A9] rounded-[12px] text-white text-xs p-[3px] truncate'>
                
              <option  value="Depresión">Depresión</option>
              <option  value="Trastorno bipolar">Trastorno bipolar</option>
              <option  value="Ansiedad">Ansiedad</option>
              <option  value="Trastorno obsesivo-compulsivo">Trastorno obsesivo-compulsivo</option>
              <option  value="Trastorno por estrés postraumático">Trastorno por estrés postraumático</option>
              <option  value="Trastorno por estrés agudo">Trastorno por estrés agudo</option>
              <option  value="Somatización">Somatización</option>
              <option  value="Disfunciones sexuales">Disfunciones sexuales</option>
              <option  value="Abusos sexuales">Abusos sexuales</option>
              <option  value="Dependencia emocional">Dependencia emocional</option>
              <option  value="Insomnio y trastornos del sueño">Insomnio y trastornos del sueño</option>
              <option  value="Trastornos de personalidad">Trastornos de personalidad</option>
              <option  value="Terapia de pareja">Terapia de pareja</option>
              
              </select>

              <button id='buscar' onClick={() => searchDoctor(star, specialization)} className='bg-[#908989] w-[155px] h-[50px] rounded-[12px] flex justify-center items-center'><img className="w-[24px] h-[24px]" src={Lupa} alt="" /></button>
            </div>

          </div>

          
        
      </div>
      )}
      <div className='flex flex-row flex-wrap justify-evenly overflow-y-scroll items-center mt-5'> 
          {doctors==null ? <div>No hay resultados para su búsqueda</div> :  doctors?.map((doctor, idx) => (
            <>
            <Link to={`/doctors/${doctor.uid}`}><DoctorCard info={doctor} key={idx}/></Link>
            </>
          )
          )}
        </div>
    </div>
      
    </div>
  )
}
