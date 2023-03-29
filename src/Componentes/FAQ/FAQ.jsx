import React, { useState } from "react";
import { Dropdown } from "../../Componentes/Dropdown/Dropdown";
import imgpreguntas from "../../imagenes/imgpreguntas.jpg";

export function FAQ() {
  const [faq1, setFaq1] = useState(false);
  const [faq2, setFaq2] = useState(false);
  const [faq3, setFaq3] = useState(false);
  const [faq4, setFaq4] = useState(false);
  const [faq5, setFaq5] = useState(false);
  const [faq6, setFaq6] = useState(false);

  return (
    <div className="flex flex-col justify-center mt-6 rounded-t-xl bg-white" id="faq" name="faq">
      {" "}
      {/*Contenedor de preguntas frecuentes*/}
      <h1 className="text-[17px] sm:text-[28px]  mt-8 mb-4 lg:mb-8 text-[#5974A9] text-center font-semibold font-comfortaa">
        Preguntas Frecuentes
      </h1>
      <div className="flex">
        <div className="p-8 font-comfortaa font-black text-[13px] sm:text-[18px] w-[800px] lg:w-[1000px]">
          <div
            onClick={() => {
              setFaq1(!faq1);
            }}
          >
            ¿Cómo puedo agendar una sesión?
            <div
              className={`${
                faq1
                  ? "opacity-100 visible translate-y-0 duration-500 text-justify"
                  : "opacity-0 invisible translate-y-[-20px] duration-500 text-justify"
              }`}
            >
              <Dropdown
                text={`${
                  faq1
                    ? "Para agendar una sesión con un especialista de nuestra plataforma, sólo debes estar registrado, de esta manera podrás encontrar a un psicólogo que se adapte a tus necesidades."
                    : ""
                }`}
              />
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
                    ? "opacity-100 visible translate-y-0 duration-500 text-justify"
                    : "opacity-0 invisible translate-y-[-20px] duration-500"
                }`}
              >
                <Dropdown
                  text={`${
                    faq2
                      ? "La duración de cada sesión dependerá de la disponibilidad en el horario del especialista. En caso de que esté disponible y el psicólogo lo vea conveniente, podrás ampliar el tiempo de tu sesión."
                      : ""
                  }`}
                />
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
                    ? "opacity-100 visible translate-y-0 duration-500 text-justify"
                    : "opacity-0 invisible translate-y-[-20px] duration-500"
                }`}
              >
                <Dropdown
                  text={`${
                    faq3
                      ? "Nuestros especialistas eligen el costo de la sesión a realizar. Debes escoger el que mejor se adapte a tus necesidades."
                      : ""
                  }`}
                />
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
                    ? "opacity-100 visible translate-y-0 duration-500 text-justify"
                    : "opacity-0 invisible translate-y-[-20px] duration-500"
                }`}
              >
                <Dropdown
                  text={`${
                    faq4
                      ? "Contamos con un gran número de psicólogos especializados en distintas áreas. Por ejemplo: Depresión, Ansiedad, Dependencia Emocional, Terapia de pareja, entre otros. Puedes realizar terapia a largo plazo con un mismo especialista."
                      : ""
                  }`}
                />
              </div>
            </div>
          </div>
          <div
            onClick={() => {
              setFaq5(!faq5);
            }}
          >
            Si soy especialista en el área de salud mental, ¿Cómo puedo unirme a
            la comunidad?
            <div
              className={`${
                faq5
                  ? "opacity-100 visible translate-y-0 duration-500 text-justify"
                  : "opacity-0 invisible translate-y-[-20px] duration-500"
              }`}
            >
              <Dropdown
                text={`${
                  faq5
                    ? "PsicoMedica es una plataforma que ofrece servicios de terapia psicológica en línea, donde tienes la oportunidad de conectar con personas de todo el mundo. El registro es gratuito y te permite controlar tu propio horario y organizar tu tiempo. Nosotros nos encargamos de encontrar pacientes y usted podrá atenderlos remotamente a través de chats privados."
                    : ""
                }`}
              />
            </div>
          </div>
          <div
            onClick={() => {
              setFaq6(!faq6);
            }}
          >
            Si ya me admitieron como especialista, ¿qué datos debo completar?
            <div
              className={`${
                faq6
                  ? "opacity-100 visible translate-y-0 duration-500 text-justify"
                  : "opacity-0 invisible translate-y-[-20px] duration-500"
              }`}
            >
              <Dropdown
                text={`${
                  faq6
                    ? "Una vez hayas realizado el registro como especialista, debes llenar algunos detalles en tu perfil para que los pacientes puedan encontrarte y agendar sus citas. Estas características incluyen: especialidades, precio de consulta, años de experiencia y una breve descripción."
                    : ""
                }`}
              />
            </div>
          </div>
        </div>
        <div className="hidden lg:block lg:h-[400px] lg:w-[1100px] sm:w-[800px]">
          {" "}
          {/*Lado derecho de la vista con imagen*/}
          <img
            src={imgpreguntas}
            alt="Imagen"
            className="w-[400px] h-[150px] sm:h-[250px] sm:w-[600px] lg:h-[350px] lg:w-[500px] lg:ml-[150px] mt-[35px] lg:mt-[1px]"
          />
        </div>
      </div>
    </div>
  );
}
