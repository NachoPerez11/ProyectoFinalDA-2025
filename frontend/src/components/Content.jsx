import Login from './Login.jsx';
import { useSession } from './Session.jsx';
import Router from './Router.jsx';
import { Routes, Route, Link } from 'react-router-dom';
import AltaUsuario from './AltaUsuario.jsx';

export default function Content() {
    const session = useSession();
    return (
        <div>
            {/* Si NO está logueado mostramos Login */}
            {!session.isLoggedIn && 
            <li><Link to="/registro">Registrarse</Link></li>
            }
            {!session.isLoggedIn && <Login />}

            {/* Si está logueado mostramos solo el Router */}
            {session.isLoggedIn && <Router />}
        </div>
    );
}

/*
<Routes>
    <Route path="/registro" element={<AltaUsuario />} />
</Routes>
*/
