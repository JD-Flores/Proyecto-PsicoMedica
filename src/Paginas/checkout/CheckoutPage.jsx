import React from "react";
import { ProfileNav } from "../../Componentes/ProfileNav/ProfileNav";
import paypal from  "../../imagenes/paypal.png";
import { useParams } from "react-router-dom";
import { getDoctorById } from "../../firebase/users-service";
import { useState, useEffect } from "react";
import { docContext } from "../../contexts/DoctorContext";
import { useContext } from "react";
import { reserveContext } from "../../contexts/ReserveContext";


export function CheckoutPage() {

  const { doctor_id } = useParams();
    const [doctor, setDoctor] = useState([]);
    const [context, setContext] = useContext(docContext);
    const [reservationContext, setReservationContext] = useContext(reserveContext);

    // // busca si el documento exist o ya esta creado
    // const res = await getDoc(doc(db,"calendarios",doctor.uid));
    //     try{    
            
    //       if(!res.exists()){
    //           //si no esta creado lo creo con el id del Doctor
    //           await setDoc(doc(db,"calendarios",doctor.uid),{citas:[]});   
    //       }
    //       // Si ya existe o fue creado agrega al array de citas la nueva cita
    //         await updateDoc(doc(db,"calendarios",doctor.uid),{
    //           citas:arrayUnion({
    //               title: user.name+":  "+data.motivoCita,
    //               start:data.fecha +" "+ data.hora,
    //               end:data.fecha +" "+ data.hora2,
    //             })
    //           })
    //           navigate(`/checkout/${doctor.uid}`)
    //       }catch{

    //       }

    const getDoctor= async (id) => {
        const data = await getDoctorById(id);
        setDoctor(data);
      }
        

    useEffect(() => {
        const result = getDoctor(doctor_id);
      }, []);
  return (
     

        <div id="container" className="h-[780px]">
          {/* <ProfileNav></ProfileNav> */}
  
          <div className="max-w-lg mx-auto m-14 bg-white p-10 rounded-xl shadow shadow-slate-300 h-[720px]">
            <div>
              <h1 className="text-4xl text-gray-500 text-justify p-2">
                Checkout
              </h1>
  
              <div className=" text-center shadow shadow-slate-300 rounded-xl p-5 mt-7">
                <div className="selectDoctor">
                  <h2 className="text-base text-purple font-bold mb-1 mt-1 text-left">
                    Nombre doctor:
                  </h2>
                  <p className="text-base text-left px-6 font-bold">{context.name}</p>
                </div>
  
                {/* Input fecha */}
                <form >
                  <label htmlFor="date">
                    <div className="py-1 mt-2">
                      <h2 className="text-base text-purple font-bold mb-1 mt-1 text-left">
                        Fecha:
                      </h2>
  
                      <p className="text-base text-left px-6 font-bold">{reservationContext.start}</p>
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
                      <img src={paypal} alt="logo paypal" className=' w-[150px] h-[50px]  items-center justify-center  mt-[17px] '/>
                
                    </div>
                  </label>
                </form>
  
                
              </div>
              <div className="flex flex-row items-center justify-evenly  text-xs m-7">
                  
                    <button className="flex items-center justify-center bg-black text-white p-1 rounded-md h-10 w-[180px] text-center text-sm font-medium" type="submit">
                      <span>Pagar Cita </span>
                    </button>
       
                </div>
            </div>
          </div>
        </div>

    );

}
