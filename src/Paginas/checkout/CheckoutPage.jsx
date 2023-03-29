import React from "react";
import { ProfileNav } from "../../Componentes/ProfileNav/ProfileNav";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import {Checkout} from "../../Componentes/Checkout/checkout.jsx"
import { useParams } from "react-router-dom";
import { getDoctorById } from "../../firebase/users-service";
import { useState, useEffect } from "react";
import { docContext } from "../../contexts/DoctorContext";
import { useContext } from "react";
import { reserveContext } from "../../contexts/ReserveContext";
import { BuscarDoc } from "../buscarDoc/BuscarDoc";
import { BUSCAR_DOC } from "../../constantes/urls";


export function CheckoutPage() {

  const { doctor_id } = useParams();
  const navigate = useNavigate()
    const [context, setContext] = useContext(docContext);
    const [reservationContext, setReservationContext] = useContext(reserveContext);
    const [price, setPrice] = useState(0);

    useEffect(() => {
      if(reservationContext!=null){
      setPrice(parseInt(reservationContext.end.split(" ")[1].split(":")[0] - reservationContext.start.split(" ")[1].split(":")[0])*context.Price);
    }else{
      navigate(BUSCAR_DOC)
    }
    }, []);

    

   
  return (

        <div id="container" className="h-min">
          {/* <ProfileNav></ProfileNav> */}
          {context != null &&
          <div className="p-10">
          <div className="md:max-w-lg max-w-sm mx-auto bg-white p-10 rounded-xl shadow shadow-slate-300">
            <h1 className="text-3xl lg:text-4xl text-gray-500 text-justify p-1">
              Checkout
            </h1>

            <div className=" text-center shadow shadow-slate-300 rounded-xl p-5 mt-7">
              <div className="selectDoctor">
                <h2 className="text-base lg:text-lg font-bold mb-1 mt-1 text-left text-[#5974A9]">
                  Nombre doctor:
                </h2>
                <p className="text-base text-left px-6 font-bold">{context.name} {context.lastname}</p>
              </div>

              {/* Input fecha */}
              <form >
                <label htmlFor="date">
                  <div className="py-1 mt-2">
                    <h2 className="text-base lg:text-lg font-bold mb-1 mt-1 text-left text-[#5974A9]">
                      Fecha:
                    </h2>

                    <p className="text-base text-left px-6 font-bold">{reservationContext.start.split(" ")[0]}</p>
                  </div>
                </label>

                {/* Input Hora */}
                <label htmlFor="time">
                  <div className="py-1 mt-2">
                    <h2 className="text-base lg:text-lg font-bold mb-1 mt-1 text-left text-[#5974A9]">
                      Hora:
                    </h2>
                    <p className="text-base text-left px-6 font-bold">{reservationContext.start.split(" ")[1]}</p>
                  </div>
                </label>

                {/* Input Duración */}
                <label htmlFor="duration">
                  <div className="py-1 mt-2">
                    <h2 className="text-base lg:text-lg text-[#5974A9] font-bold mb-1 mt-1 text-left">
                      Duración:
                    </h2>
                    <p className="text-base text-left px-6 font-bold">{reservationContext.end.split(" ")[1].split(":")[0] - reservationContext.start.split(" ")[1].split(":")[0]} horas</p>
                  </div>
                </label>

                {/* Input Motivo */}
                <label htmlFor="motive">
                  <div className="py-1 mt-2">
                    <h2 className="text-base lg:text-lg text-[#5974A9] font-bold mb-1 mt-1 text-left">
                      Total a pagar:
                    </h2>
                    <p className="text-base text-left px-6 font-bold">{price}$</p>
                  </div>
                </label>
                <label htmlFor="paypal" >
                  <div className="py-1 mt-2">
                    
                    <h2 className="text-base lg:text-lg text-[#5974A9] font-bold mb-1 mt-1 text-left">
                      Método de pago:
                    </h2>
                    <div className="mt-5 flex justify-center h-min">
                      <Checkout price={price} />          
                    </div>
              
                  </div>
                </label>
              </form>

            </div>
          </div>
        </div>
           }
           {context == null&&
           navigate(BUSCAR_DOC)
           }
          
        </div>

    );

}
