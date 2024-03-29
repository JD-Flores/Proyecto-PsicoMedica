import {Navbar} from "../../Componentes/Navbar/Navbar"
import { Outlet } from "react-router-dom"
import { UserContextProvider } from "../../contexts/UserContext";
import { ChatContextProvider } from "../../contexts/chatContext";
import { DoctorContext } from "../../contexts/DoctorContext";
import { ReserveContext
 } from "../../contexts/ReserveContext";
export function Layout() {
  return (
    <main className="bg-[#5974A9] min-h-full">
      <UserContextProvider>
        <ChatContextProvider>
          <DoctorContext>
            <ReserveContext>

      <Navbar />
      <section className="body h-full " >
        <Outlet />
      </section>
      </ReserveContext>
      </DoctorContext>
      </ChatContextProvider>
      </UserContextProvider>
  </main>
  );
}
