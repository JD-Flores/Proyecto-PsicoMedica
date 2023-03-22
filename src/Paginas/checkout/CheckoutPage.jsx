import React from "react";
import { ProfileNav } from "../../Componentes/ProfileNav/ProfileNav";
import paypal from  "../../imagenes/paypal.png";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CheckoutForm from "../../Componentes/Checkout/checkout.jsx"

export function CheckoutPage() {
  return (
     

        <div id="container" className="h-min">
          {/* <ProfileNav></ProfileNav> */}
  
          <div className="p-10">
            <div className="md:max-w-lg max-w-sm mx-auto bg-white p-10 rounded-xl shadow shadow-slate-300">
              <h1 className="text-4xl text-gray-500 text-justify p-2">
                Checkout
              </h1>
  
              <div className=" text-center shadow shadow-slate-300 rounded-xl p-5 mt-7">
                <div className="selectDoctor">
                  <h2 className="text-base text-purple font-bold mb-1 mt-1 text-left">
                    Nombre doctor:
                  </h2>
                  <p className="text-base text-left px-6 font-bold">Nombre doctor</p>
                </div>
  
                {/* Input fecha */}
                <form >
                  <label htmlFor="date">
                    <div className="py-1 mt-2">
                      <h2 className="text-base text-purple font-bold mb-1 mt-1 text-left">
                        Fecha:
                      </h2>
  
                      <p className="text-base text-left px-6 font-bold">DD/MM/AAAA</p>
                    </div>
                  </label>
  
                  {/* Input Hora */}
                  <label htmlFor="time">
                    <div className="py-1 mt-2">
                      <h2 className="text-base text-purple font-bold mb-1 mt-1 text-left">
                        Hora:
                      </h2>
                      <p className="text-base text-left px-6 font-bold">00:00</p>
                    </div>
                  </label>
  
                  {/* Input Duración */}
                  <label htmlFor="duration">
                    <div className="py-1 mt-2">
                      <h2 className="text-base text-purple font-bold mb-1 mt-1 text-left">
                        Duración:
                      </h2>
                      <p className="text-base text-left px-6 font-bold">minutos</p>
                    </div>
                  </label>
  
                  {/* Input Motivo */}
                  <label htmlFor="motive">
                    <div className="py-1 mt-2">
                      <h2 className="text-base text-purple font-bold mb-1 mt-1 text-left">
                        Total a pagar:
                      </h2>
                      <p className="text-base text-left px-6 font-bold">$</p>
                    </div>
                  </label>
                  <label htmlFor="paypal" >
                    <div className="py-1 mt-2">
                      
                      <h2 className="text-base text-purple font-bold mb-1 mt-1 text-left">
                        Método de pago:
                      </h2>
                      <div className="mt-5 flex justify-center h-min">
                        <CheckoutForm />          
                      </div>
                
                    </div>
                  </label>
                </form>
  
              </div>
            </div>
          </div>
        </div>

    );

}
