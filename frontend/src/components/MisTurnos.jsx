import { useState, useEffect } from 'react';
import * as turnoService from '../services/turnoService.js';
import { useSnackbar } from './Snackbar.jsx';

export default function MisTurnos() {
    const [turnos, setTurnos] = useState([]);
    const snackbar = useSnackbar();

    useEffect(() => {
        turnoService.getMisTurnos()
            .then(data => {
                setTurnos(data);
            })
            .catch(err => {
                 snackbar.enqueue(`Error al cargar tus turnos: ${err.message}`, { variant: 'error' });
            });
    }); // Poner un array vacío para asegurar que se ejecute solo una vez (arreglar el problema que sale)

    // Función para formatear la fecha
    const formatearFecha = (fechaISO) => {
        const fecha = new Date(fechaISO);
        // Ajustado para Argentina
        return fecha.toLocaleString('es-AR', {
            dateStyle: 'short',
            timeStyle: 'short'
        });
    }

    return (
        <div>
            <h2>Mis Turnos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Fecha y Hora</th>
                        <th>Servicio</th>
                        <th>Precio</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {turnos.map(turno => (
                        <tr key={turno._id}>
                            <td>{formatearFecha(turno.fecha)}</td>
                            <td>{turno.servicio.nombre}</td>
                            <td>${turno.servicio.precio}</td>
                            <td>{turno.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}