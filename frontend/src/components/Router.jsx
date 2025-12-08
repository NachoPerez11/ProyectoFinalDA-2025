import { Routes, Route } from 'react-router-dom';
import { useSession } from './Session.jsx'; 
import Home from './Home.jsx';
import About from './About.jsx';
//import NotFound from './NotFound.jsx';
//import Login from './Login.jsx';
import Usuarios from './Usuarios.jsx';
import Usuario from './Usuario.jsx';
import Servicios from './Servicios.jsx';
import ReservarTurno from './ReservarTurno.jsx';
import MisTurnos from './MisTurnos.jsx';
import GestionTurnos from './GestionTurnos.jsx';
import CrearServicio from './CrearServicio.jsx';


export default function Router() {
    const session = useSession();
    //const user = session.user;


    return (
        <Routes>
            {/* Ruta Pública */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/servicios" element={<Servicios />} />

            {/* Rutas para Logueados */}
            {session.user?.roles?.includes('cliente') &&
            <>
                <Route path="/mis-turnos" element={<MisTurnos />} />
                <Route path="/reservar" element={<ReservarTurno />} />
            </>}

            {/* Rutas de Admin */}
            {session.user?.roles?.includes('admin') && <>
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/usuario/:uuid" element={<Usuario />} />
                <Route path="/admin/turnos" element={<GestionTurnos />} />
                <Route path="/admin/servicios/crear" element={<CrearServicio />} />
            </>}

            {/* Error 404 */}
            {/*<Route path="*" element={<NotFound />} />*/}
        </Routes>
    );
}