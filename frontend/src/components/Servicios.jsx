import { useState, useEffect } from 'react';
import * as servicioService from '../services/servicioService.js';

export default function Servicios() {
    const [servicios, setServicios] = useState([]);

    useEffect(() => {
        servicioService.getServicios().then(data => {
            setServicios(data);
        });
    }, []);

    return (
        <div>
            <h2>Nuestros Servicios</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Duración (min)</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {servicios.map(servicio => (
                        <tr key={servicio._id}>
                            <td>{servicio.nombre}</td>
                            <td>{servicio.duracion}</td>
                            <td>${servicio.precio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}