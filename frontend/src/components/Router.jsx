import { Routes, Route } from 'react-router-dom';
import { useSession } from './Session.jsx'; 
import About from './About.jsx';
import NotFound from './NotFound.jsx'; 
import Home from './Home.jsx';
import Usuarios from './Usuarios.jsx';
import Usuario from './Usuario.jsx';
import Servicios from './Servicios.jsx';
import ReservarTurno from './ReservarTurno.jsx';
import MisTurnos from './MisTurnos.jsx';

export default function Router() {
    const session = useSession();

    return <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />

        {/* Rutas para usuarios logueados */}
        {session.isLoggedIn && <>
            <Route path="/reservar" element={<ReservarTurno />} /> {/* <-- 3. AÑADIR RUTA */}
            <Route path="/mis-turnos" element={<MisTurnos />} />   {/* <-- 4. AÑADIR RUTA */}
        </>}

        {/* Rutas para administradores */}
        {session.user?.roles?.includes('admin') && <>
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/usuario" element={<Usuario />} />
            <Route path="/usuario/:uuid" element={<Usuario />} />
        </>}

        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
}