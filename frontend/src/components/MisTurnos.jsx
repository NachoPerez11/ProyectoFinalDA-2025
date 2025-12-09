import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as turnoService from '../services/turnoService.js';
import { useSnackbar } from './Snackbar.jsx';

export default function MisTurnos() {
    const [turnos, setTurnos] = useState([]);
    const snackbar = useSnackbar();

    useEffect(() => {
        cargarTurnos();
    }, []);

    function cargarTurnos() {
        turnoService.getMisTurnos()
            .then(data => setTurnos(data))
            .catch(err => snackbar.enqueue(`Error: ${err.message}`, { variant: 'error' }));
    }

    const formatearFecha = (fechaISO) => {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' });
    }

    return (
        <div>
            <div>
                <h2>Mis Turnos</h2>
                <Link to="/nuevo-turno"><button >Nuevo Turno</button></Link>
            </div>
            {turnos.length === 0 ? (
                <div>
                    <h3>No tenés turnos reservados todavía.</h3>
                </div>
            ) : (
                <table className='tabla'>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Servicio</th>
                            <th>Precio</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {turnos.map(turno => (
                            <tr key={turno._id}>
                                <td>{formatearFecha(turno.fecha)}</td>
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