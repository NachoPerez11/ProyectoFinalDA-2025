import { useSession } from './Session.jsx';
import { Link } from 'react-router-dom';

export default function Menu() {
  const session = useSession();
  return (
    <nav className="menu">
      <li><Link to="/">Inicio</Link></li>
      <li><Link to="/servicios">Servicios</Link></li>
      {session.isLoggedIn && <>
          {/* Links para todos los logueados */}
          <li><Link to="/reservar">Reservar Turno</Link></li>
          <li><Link to="/mis-turnos">Mis Turnos</Link></li>           
          <li><Link to="#" onClick={() => session.setIsLoggedIn(false)}>Salir</Link></li>


          {/* Links solo para administradores */}
          {
            session.user?.roles.includes('admin') &&
            <li><Link to="/usuarios">Usuarios</Link></li>
          }
          
        </>
      }
      <li><Link to="/about">Acerca de</Link></li>
      <li><Link to="/contact">Contacto</Link></li>
    </nav>
  );
} 