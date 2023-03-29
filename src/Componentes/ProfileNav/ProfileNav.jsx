import React from "react";
import { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import {
  BUSCAR_DOC,
  CHAT,
  PERFIL_CLIENTE,
  RESERVAR_CITA,
} from "../../constantes/urls";
import ArrowDown from "../../imagenes/arrow-down-s-line.png";
import ArrowUp from "../../imagenes/arrow-up-s-line.png";

export function ProfileNav() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div id="main-container" className=" flex flex-col gap-y-[13px] w-full items-center">
      <button onClick={() => setIsOpen((prev) => !prev)} className="flex flex-row justify-between text-white items-center w-[363px] h-[36px] bg-[#908989] rounded-[12px] px-[13px] 
      md:w-[583px] md:text-[20px]
      lg:w-[683px] lg:text-[24px]
      xl:w-[763px] xl:text-[24px]">
        Menu
        {!isOpen ? (
          <img className="w-[24px] lg:w-[32px] h-[24px] lg:h-[32px]" src={ArrowDown} alt="" />
        ) : (
          <img className="w-[24px] lg:w-[32px] h-[24px] lg:h-[32px]" src={ArrowUp} alt="" />
        )}
      </button>

      {isOpen && (
        <div className="flex flex-col w-[364px]  bg-white p-2 rounded-xl shadow shadow-slate-300 
        md:w-[583px] md:text-[20px]
        lg:w-[683px] lg:text-[24px]
        xl:w-[763px] xl:text-[24px]"
        >
        <div id="top" className="flex items-center justify-center h-full">
          <h1 className="flex items-center justify-center text-center text-xl  mb-2 md:text-2xl lg:text-3xl">
            Bienvenido {user.name}
          </h1>
        </div>
        <div
          id="bottom"
          className="flex flex-row items-center justify-evenly  text-xs mb-2 md:text-sm lg:text-lg"
        >
          <Link
            to={PERFIL_CLIENTE}
            className="flex items-center justify-center bg-[#5974A9] text-white p-1 rounded-md h-10 w-1/5 text-center"
          >
            Perfil
          </Link>
          <Link
            to={BUSCAR_DOC}
            className="flex items-center justify-center bg-[#5974A9] text-white p-1 rounded-md h-10 w-1/5 text-center"
          >
            Buscar Doctor
          </Link>
          <Link
            to={CHAT}
            className="flex items-center justify-center bg-[#5974A9] text-white p-1 rounded-md h-10 w-1/5 text-center"
          >
            Chats
          </Link>
        </div>
      </div>
      )}
    </div>
  );
}
