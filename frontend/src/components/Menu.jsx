import { useSession } from './Session.jsx';
import { Link } from 'react-router-dom';

export default function Menu() {
  const session = useSession();
  
  return (
    <nav>
      {/* RUTAS PARA NO LOGUEADOS (Públicas) */}
      {!session.isLoggedIn && (
        <>
            <li><Link to="/login">Iniciar Sesión</Link></li>
            <li><Link to="/registro">Registrarme</Link></li>
        </>
      )}

      {/* Links para administradores */}
      {session.user?.roles?.includes('admin') &&
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
      
      {/* Botón Salir */}
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
    </nav>
  );
}