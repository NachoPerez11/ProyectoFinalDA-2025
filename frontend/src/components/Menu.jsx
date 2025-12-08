import { useSession } from './Session.jsx';
import { Link } from 'react-router-dom';

export default function Menu() {
  const session = useSession();
  return (
    <nav>
      {/*<li><Link to="/servicios">Servicios</Link></li>*/}
      {/* Links para administradores */}
      {session.user?.roles.includes('admin') &&
      <>
        <li><Link to="/usuarios">Usuarios</Link></li>
        <li><Link to="/admin/turnos">Turnos</Link></li>
        <li><Link to="/admin/servicios/crear">Nuevo Servicio</Link></li>
        <li><Link to="#" onClick={() => session.setIsLoggedIn(false)}>Salir</Link></li>
      </>
      }
      {/* Links para clientes */}
      {session.user?.roles?.includes('cliente') &&
      <>
        <li><Link to="/mis-turnos">Mis Turnos</Link></li> 
        <li><Link to="/reservar">Reservar Turno</Link></li>
        <li><Link to="#" onClick={() => session.setIsLoggedIn(false)}>Salir</Link></li>
      </>}
      {/* Links para crear una cuenta */}
      {!session.isLoggedIn && 
      <>
        <li><Link to="/register">Registrarse</Link></li>
      </>}
    </nav>
  );
} 