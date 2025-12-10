import { Routes, Route } from 'react-router-dom';
import { useSession } from './Session.jsx';
import Home from './Home.jsx';
import NotFound from './NotFound.jsx';
import Login from './Login.jsx';
import GestionUsuarios from './GestionUsuarios.jsx';
import GestionServicios from './GestionServicios.jsx';
import GestionTurnos from './GestionTurnos.jsx';
import AltaUsuario from './AltaUsuario.jsx';
import AltaServicio from './AltaServicio.jsx';

// Archivos de Cliente
import MisTurnos from './MisTurnos.jsx';
import AltaTurno from './AltaTurno.jsx';


export default function Router() {
    const session = useSession();
    const user = session.user;

    return (
        <Routes>
            {/* --- RUTAS PÚBLICAS --- */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/registro" element={<AltaUsuario />} />

            {/* --- RUTAS CLIENTE --- */}
            {user?.roles?.includes('cliente') && <>
                <Route path="/mis-turnos" element={<MisTurnos />} />
                <Route path="/mi-perfil" element={<AltaUsuario />} />
                <Route path="/nuevo-turno" element={<AltaTurno />} />
            </>}

            {/* --- RUTAS ADMINISTRADOR --- */}
            {user?.roles?.includes('admin') && <>
                {/* Gestión de Usuarios */}
                <Route path="/admin/usuarios" element={<GestionUsuarios />} />
                <Route path="/admin/usuarios/alta" element={<AltaUsuario />} />
                <Route path="/admin/usuarios/:uuid" element={<AltaUsuario />} /> 

                {/* Gestión de Servicios */}
                <Route path="/admin/servicios" element={<GestionServicios />} />
                <Route path="/admin/servicios/alta" element={<AltaServicio />} />
                <Route path="/admin/servicios/:id" element={<AltaServicio />} />

                {/* Gestión de Turnos */}
                <Route path="/admin/turnos" element={<GestionTurnos />} />
            </>}
            
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}