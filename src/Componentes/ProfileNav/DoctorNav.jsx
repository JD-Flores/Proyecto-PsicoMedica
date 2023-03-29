import React from "react";
import { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import {
  CALENDAR,
  CHAT,
  CHATDOC,
  FEEDBACK,
  PERFIL_DOCTOR,
} from "../../constantes/urls";
import ArrowDown from "../../imagenes/arrow-down-s-line.png";
import ArrowUp from "../../imagenes/arrow-up-s-line.png";

export function DoctorNav() {
    const { user } = useUser();
    const [isOpen, setIsOpen] = useState(false)

  return (
    <div id="main-container" className=" flex flex-col gap-y-[13px] w-full items-center ">
      <button onClick={() => setIsOpen((prev) => !prev)} className="flex flex-row justify-between text-white items-center w-[363px] h-[36px] bg-[#908989] rounded-[12px] px-[13px]">
        Menu
        {!isOpen ? (
          <img className="w-[24px] h-[24px]" src={ArrowDown} alt="" />
        ) : (
          <img className="w-[24px] h-[24px]" src={ArrowUp} alt="" />
        )}
      </button>

      {isOpen && (
        <div className="flex flex-col w-[364px]  bg-white p-2 rounded-xl shadow shadow-slate-300 ">
        <div id="top" className="flex items-center justify-center h-full">
          <h1 className="flex items-center justify-center text-center text-xl  mb-2">
            Bienvenido {user.name}
          </h1>
        </div>
        <div
          id="bottom"
          className="flex flex-row items-center justify-evenly  text-xs mb-2"
        >
          <Link
            to={PERFIL_DOCTOR}
            className="flex items-center justify-center bg-[#5974A9] text-white p-1 rounded-md h-10 w-1/5 text-center"
          >
            Perfil
          </Link>
          <Link
            to={CALENDAR}
            className="flex items-center justify-center bg-[#5974A9] text-white p-1 rounded-md h-10 w-1/5 text-center"
          >
            Calendario
          </Link>
          <Link
            to={CHATDOC}
            className="flex items-center justify-center bg-[#5974A9] text-white p-1 rounded-md h-10 w-1/5 text-center"
          >
            Chats
          </Link>
          <Link
            to={FEEDBACK}
            className="flex items-center justify-center bg-[#5974A9] text-white p-1 rounded-md h-10 w-1/5 text-center"
          >
            Feedback
          </Link>
        </div>
      </div>
      )}
    </div>
  )
}
