import {Navbar} from "../../Componentes/Navbar/Navbar"
import { Outlet } from "react-router-dom"
import { UserContextProvider } from "../../contexts/UserContext";

export function Layout() {
  return (
    <main className="bg-blue-400 h-full">
      <UserContextProvider>
      <Navbar />
      <section className="body h-full " >
        <Outlet />
      </section>
      </UserContextProvider>
  </main>
  );
}
