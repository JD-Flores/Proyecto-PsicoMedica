import {Navbar} from "../../Componentes/Navbar/Navbar"
import { Outlet } from "react-router-dom"
import { UserContextProvider } from "../../contexts/UserContext";

export function Layout() {
  return (
    <main className="bg-purple min-h-full">
      <UserContextProvider>
      <Navbar />
      <section className="body h-full " >
        <Outlet />
      </section>
      </UserContextProvider>
  </main>
  );
}
