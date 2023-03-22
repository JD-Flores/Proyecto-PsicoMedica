import {Navbar} from "../../Componentes/Navbar/Navbar"
import { Outlet } from "react-router-dom"
import { UserContextProvider } from "../../contexts/UserContext";
import { ChatContextProvider } from "../../contexts/chatContext";

export function Layout() {
  return (
    <main className="bg-[#5974A9] min-h-full">
      <UserContextProvider>
        <ChatContextProvider>
      <Navbar />
      <section className="body h-full " >
        <Outlet />
      </section>
      </ChatContextProvider>
      </UserContextProvider>
  </main>
  );
}
