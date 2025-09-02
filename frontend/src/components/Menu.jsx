import { useSession } from './Session.jsx';
import { Link } from 'react-router-dom';

export default function Menu() {
  const session = useSession();
  return (
    <nav className="menu">
      <li><Link to="/">Inicio</Link></li>
      {
        session.isLoggedIn && 
          <>
            {
              //session.roles.includes('admin') &&  //Si el usuario es admin (Hacer comprobación)
              <li><Link to="/usuarios">Usuarios</Link></li>
            }
            <li><Link to="#" onClick={() => session.setIsLoggedIn(false)}>Salir</Link></li>
          </>
      }
      <li><Link to="/about">Acerca de</Link></li>
      <li><Link to="/contact">Contacto</Link></li>
      
    </nav>
  );
} 