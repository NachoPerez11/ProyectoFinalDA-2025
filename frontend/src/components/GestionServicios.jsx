// EN: src/components/GestionServicios.jsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as servicioService from '../services/servicioService.js';
import { useSnackbar } from './Snackbar.jsx';

export default function GestionServicios() {
    const [servicios, setServicios] = useState([]);
    const snackbar = useSnackbar();

    useEffect(() => {
        cargarServicios();
    }, []);

    function cargarServicios() {
        servicioService.getServicios()
            .then(data => {
                setServicios(data);
            })
            .catch(err => {
                 snackbar.enqueue(`Error al cargar servicios: ${err.message}`, { variant: 'error' });
            });
    }

    return (
        <div className="tabla">
            <div>
                <h2>Gestión de Servicios</h2>
                <Link to="/admin/servicios/alta">
                    <button>Nuevo Servicio</button>
                </Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Duración</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {servicios.map(servicio => (
                        <tr key={servicio._id}>
                            <td>{servicio.nombre}</td>
                            <td>{servicio.duracion} min</td>
                            <td>${servicio.precio}</td>
                            <td>
                                <Link to={`/admin/servicios/${servicio._id}`}>
                                    <button style={{ marginRight: '0.5em' }}>Editar</button>
                                </Link>
                                <button disabled title="Próximamente">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}