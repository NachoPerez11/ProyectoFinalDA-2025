import { useState, useEffect } from 'react';
import * as turnoService from '../services/turnoService.js';
import { useSnackbar } from './Snackbar.jsx';

export default function GestionTurnos() {
    const [turnos, setTurnos] = useState([]);
    const snackbar = useSnackbar();

    useEffect(() => {
        turnoService.getAllTurnos()
            .then(data => {
                setTurnos(data);
            })
            .catch(err => {
                 snackbar.enqueue(`Error al cargar todos los turnos: ${err.message}`, { variant: 'error' });
            });
    });

    // (Función para formatear)
    const formatearFecha = (fechaISO) => {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleString('es-AR', {
            dateStyle: 'short',
            timeStyle: 'short'
        });
    }

    return (
        <div className='tabla'>
            <h2>Turnos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Fecha y Hora</th>
                        <th>Cliente</th>
                        <th>Email Cliente</th>
                        <th>Servicio</th>
                        <th>Precio</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {turnos.map(turno => (
                        <tr key={turno._id}>
                            <td>{formatearFecha(turno.fecha)}</td>
                            <td>{turno.cliente?.nombre}</td> 
                            <td>{turno.cliente?.email}</td>
                            <td>{turno.servicio?.nombre}</td>
                            <td>${turno.servicio?.precio}</td>
                            <td>{turno.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}