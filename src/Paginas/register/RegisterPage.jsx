import { LOGIN_URL,REGISTER_DOCTOR_URL,REGISTER_PATIENT_URL } from "../../constantes/urls";
import { Link } from "react-router-dom";
import imagenPsicologo from "../../imagenes/psicologo.png"
import imagenPaciente from "../../imagenes/Paciente.png"
import sesionPsicologica from "../../imagenes/sesionPsicologica.avif"



export function RegisterPage() {
  return (
    <div id='contenedor' className="flex h-screen justify-center items-center">
        <div id="ladoizq" className="w-full h-full text-center">
          
          <div id="titulo" className="mt-10 flex text-center h-1/5 justify-center items-center text-white text-3xl font-bold lg:text-4xl ">
            <h1 className="w-3/4 text-[30px] lg:text-[32px] mb-8">¿Cómo podemos ayudarte?</h1>
          </div>
          <div id="registros" className="flex justify-between items-center h-2/5 text-2xl">
              <div id="psicologo" className=" flex w-full  justify-center items-center">
                <Link to={REGISTER_PATIENT_URL}>
                <img src={imagenPaciente} alt="" className="rounded-full h-32 lg:h-40 "/>
                <p className="text-white font-bold mt-3">Soy Cliente</p>
                </Link>
              </div>
              <div id="cliente" className="flex w-full  justify-center items-center">
                <Link to={REGISTER_DOCTOR_URL}>
                <img src={imagenPsicologo} alt="" className="rounded-full h-32 lg:h-40 "/>
                <p className="text-white font-bold mt-3">Soy Psicólogo</p>
                </Link>
              </div>
          </div>
          <div id="footer" className="h-1/5 flex justify-center items-end p-6">
             <p className="text-center text-white font-semibold">¿Ya tienes una cuenta? <Link to={LOGIN_URL} className="text-black font-bold inline-flex space-x-1 items-center underline"><span>Inicia sesión. </span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg></span></Link></p>
          </div>
        </div>
        <div id="ladoder" className="hidden w-full h-full md:block  ">
            <img src={sesionPsicologica} alt="" className="rounded-l-3xl w-full h-full"   />
        </div>
    </div>
  )
}
