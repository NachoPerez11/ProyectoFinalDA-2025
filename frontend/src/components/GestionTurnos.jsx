import { useState, useEffect } from 'react';
import * as turnoService from '../services/turnoService.js';
import { useSnackbar } from './Snackbar.jsx';

export default function GestionTurnos() {
    const [turnos, setTurnos] = useState([]);
    const snackbar = useSnackbar();

    useEffect(() => {
        // ADMIN: Trae TODOS los turnos de la base de datos
        turnoService.getAllTurnos()
            .then(data => setTurnos(data))
            .catch(err => snackbar.enqueue(`Error: ${err.message}`, { variant: 'error' }));
    }, []);

    const formatearFecha = (fechaISO) => {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' });
    }

    return (
        <div className='tabla'>
            <div>
                <h2>Gestión de Turnos</h2>
            </div>
            {turnos.length === 0 ? (
                <div>
                    <h3>No hay turnos registrados en el sistema.</h3>
                </div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Contacto</th>
                            <th>Servicio</th>
                            <th>Precio</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {turnos.map(turno => (
                            <tr key={turno._id}>
                                <td>{formatearFecha(turno.fecha)}</td>
                                <td>{turno.cliente?.nombre || turno.cliente?.usuario || 'Desconocido'}</td>
                                <td>{turno.cliente?.email}</td>
                                <td>{turno.servicio?.nombre}</td>
                                <td>${turno.servicio?.precio}</td>
                                <td>{turno.estado}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}