import {Navbar} from "../../Componentes/Navbar/Navbar"
import { Outlet } from "react-router-dom"
import { UserContextProvider } from "../../contexts/UserContext";

export function Layout() {
  return (
    <main className="bg-blue-400 ">
      <UserContextProvider>
      <Navbar />
      <section className="body " >
        <Outlet />
      </section>
      </UserContextProvider>
  </main>
  );
}
