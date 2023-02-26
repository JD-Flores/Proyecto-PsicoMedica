import {Navbar} from "../../Componentes/Navbar/Navbar"
import { Outlet } from "react-router-dom"

export function Layout() {
  return (
    <main className="bg-blue-400 max-h-fit">
      <Navbar />
      <section className="body">
        <Outlet />
      </section>
  </main>
  );
}
