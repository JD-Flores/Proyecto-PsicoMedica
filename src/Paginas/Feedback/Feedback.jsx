import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FeedbackCard } from "../../Componentes/FeedbackCard/FeedbackCard";
import GlobalFeedback from "../../Componentes/GlobalFeedback/GlobalFeedback";
import { DoctorNav } from "../../Componentes/ProfileNav/DoctorNav";
import { useUser } from "../../contexts/UserContext";
import {
  feedbackDecision,
  feedbackForADoctor,
  getDoctorById,
} from "../../firebase/users-service";

export function Feedback() {
  const { user, setUser } = useUser();
  const [feedbacks, setFeedbacks] = useState([]);

  const getFeedback = async (user) => {
    const arrayFeedbacks = await feedbackForADoctor(user);
    setFeedbacks(arrayFeedbacks);
  };

  useEffect(() => {
    getFeedback(user);
  }, []);

  return (
    <div
      id="main-container"
      className=" flex flex-col justify-center items-center gap-[13px] py-[17px] "
    >
      <div id="top-container">
        <DoctorNav></DoctorNav>
      </div>

      <div id="bottom-containeer" className="flex flex-col p-4 w-[363px] h-4/5 bg-white rounded-[12px] 
        md:w-[583px]
        lg:w-[683px]
        xl:w-[763px]">
        <div
          id="title"
          className="text-center text-2xl lg:text-3xl font-semibold text-[#5974A9] m-2"
        >
          {user == null ? <h1></h1> : <h1>Calificación global del usuario</h1>}
        </div>

        <div className="flex flex-row flex-wrap justify-evenly overflow-y-scroll items-center mt-5">
          <GlobalFeedback info={user} />
        </div>

        <div
          id="title-feedbacks"
          className="text-center text-2xl lg:text-3xl font-semibold text-[#5974A9] m-2"
        >
          <h1>Feedbacks de usuarios</h1>
        </div>

        <div className="flex flex-row flex-wrap justify-evenly overflow-y-scroll items-center mt-5">
          {feedbacks == null ? (
            <div>No hay feedbacks realizados por usuarios aún</div>
          ) : (
            feedbacks?.map((feedback, idx) => (
              <FeedbackCard info={feedback} key={idx} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
