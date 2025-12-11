import { useState, useEffect } from 'react';
import * as turnoService from '../services/turnoService.js';
import { useSnackbar } from './Snackbar.jsx';
import Button from './Button.jsx';

export default function GestionTurnos() {
    const [turnos, setTurnos] = useState([]);
    const snackbar = useSnackbar();

    useEffect(() => {
        cargarTurnos();
    }, []);

    const cargarTurnos = () => {
        turnoService.getAllTurnos()
            .then(data => setTurnos(data))
            .catch(err => snackbar.enqueue(`Error: ${err.message}`, { variant: 'error' }));
    };

    const formatearFecha = (fechaISO) => {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' });
    }

    const cambiarEstado = async (id, accion) => {
        if (!window.confirm(`¿Estás seguro de que querés ${accion} este turno?`)) return;
        try {
            var nuevoEstado = 'Pendiente';
            if (accion === 'confirmar') {
                nuevoEstado = 'Confirmado';
            } else if (accion === 'cancelar') {
                nuevoEstado = 'Cancelado';
            }
            await turnoService.update(id, nuevoEstado);
            snackbar.enqueue(`Turno ${nuevoEstado} correctamente`, { variant: 'success' });
            cargarTurnos(); 
        } catch (err) {
            snackbar.enqueue(`Error al cambiar estado: ${err.message}`, { variant: 'error' });
        }
    };

    const turnosVisibles = turnos.filter(t => t.estado !== 'Cancelado');

    return (
        <div className='tabla'>
            <div>
                <h2>Gestión de Turnos</h2>
            </div>
            {turnosVisibles.length === 0 ? (
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
                        {turnosVisibles.map(turno => (
                            <tr key={turno._id}>
                                <td>{formatearFecha(turno.fecha)}</td>
                                <td>{turno.cliente?.nombre || turno.cliente?.usuario || 'Desconocido'}</td>
                                <td>{turno.cliente?.email}</td>
                                <td>{turno.servicio?.nombre}</td>
                                <td>${turno.servicio?.precio}</td>
                                <td>
                                    {turno.estado === 'Pendiente' ? (
                                        <div>
                                            <Button onClick={() => cambiarEstado(turno._id, 'confirmar')}>
                                                Pendiente
                                            </Button>
                                            
                                        </div>
                                    ) : (
                                        <Button onClick={() => cambiarEstado(turno._id, 'cancelar')}>
                                            Confirmado
                                        </Button>
                                    )}
                                </td>
                            </tr>
                            
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}