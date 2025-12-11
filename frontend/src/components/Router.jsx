import { Routes, Route, Navigate } from 'react-router-dom';
import { useSession } from './Session.jsx';
import Home from './Home.jsx';
import NotFound from './NotFound.jsx';
import Login from './Login.jsx';
import AltaUsuario from './AltaUsuario.jsx';
import GestionUsuarios from './GestionUsuarios.jsx';
import GestionServicios from './GestionServicios.jsx';
import GestionTurnos from './GestionTurnos.jsx';
import AltaServicio from './AltaServicio.jsx';
import MisTurnos from './MisTurnos.jsx';
import AltaTurno from './AltaTurno.jsx';

export default function Router() {
    const session = useSession();
    const user = session.user;

    return (
        <Routes>
            {/* --- RUTAS PÚBLICAS --- */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!session.isLoggedIn ? <Login /> : <Navigate to="/" />} />
            <Route path="/registro" element={<AltaUsuario />} />

            {/* --- RUTAS CLIENTE --- */}
            {user?.roles?.includes('cliente') && <>
                <Route path="/mis-turnos" element={<MisTurnos />} />
                <Route path="/mi-perfil" element={<AltaUsuario />} /> 
                <Route path="/nuevo-turno" element={<AltaTurno />} />
            </>}

            {/* --- RUTAS ADMINISTRADOR --- */}
            {user?.roles?.includes('admin') && <>
                <Route path="/admin/usuarios" element={<GestionUsuarios />} />
                <Route path="/admin/usuarios/:uuid" element={<AltaUsuario />} /> 
                <Route path="/admin/servicios" element={<GestionServicios />} />
                <Route path="/admin/servicios/alta" element={<AltaServicio />} />
                <Route path="/admin/servicios/:id" element={<AltaServicio />} />
                <Route path="/admin/turnos" element={<GestionTurnos />} />
                <Route path="/admin/turnos/:id" element={<AltaTurno />} />
            </>}
            
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}