import { useSession } from './Session.jsx';
import { Link } from 'react-router-dom';

export default function Menu() {
  const session = useSession();
  const handleLogout = () => {
    if (session.logout) session.logout();
    else session.setIsLoggedIn(false);
  };
  return (
    <nav>
      {/* Links para administradores */}
      {session.user?.roles.includes('admin') &&
      <>
        <li><Link to="/admin/usuarios">Usuarios</Link></li>
        <li><Link to="/admin/turnos">Turnos</Link></li>
        <li><Link to="/admin/servicios">Servicios</Link></li>
      </>}

      {/* Links para clientes */}
      {session.user?.roles?.includes('cliente') &&
      <>
        <li><Link to="/mis-turnos">Mis Turnos</Link></li> 
        <li><Link to="/mi-perfil">Editar perfil</Link></li>
      </>}
      
      {/* Links para usuarios */}
      {session.isLoggedIn &&
      <>      
        <li><Link to="#" onClick={() => {
              if(session.logout) {
                session.logout();
              } else {
                session.setIsLoggedIn(false);
                session.setUser(null); 
              }
          }}>Salir</Link>
        </li>
      </>}

      {/* Links para crear una cuenta */}
      {!session.isLoggedIn && 
      <>
        <li><Link to="/registro">Registrarse</Link></li>
      </>}
    </nav>
  );
} 