import { useState, useEffect } from 'react';
import * as servicioService from '../services/servicioService.js';
import * as turnoService from '../services/turnoService.js';
import { useSnackbar } from './Snackbar.jsx';

export default function ReservarTurno() {
    const [servicios, setServicios] = useState([]);
    const [servicioId, setServicioId] = useState('');
    const [fecha, setFecha] = useState('');
    
    const snackbar = useSnackbar();

    useEffect(() => {
        servicioService.getServicios()
            .then(data => {
                setServicios(data);
                if (data.length > 0) {
                    setServicioId(data[0]._id);
                }
            })
            .catch(err => {
                snackbar.enqueue(`Error al cargar servicios: ${err.message}`, { variant: 'error' });
            });
    }); // Poner un array vacío para asegurar que se ejecute solo una vez (arreglar el problema que sale)

    // Maneja el envío del formulario
    async function manejadorDeEnvios(e) {
        e.preventDefault(); // Evita que la página se recargue
        if (!servicioId || !fecha) {
            snackbar.enqueue('Seleccione un servicio y una fecha.', { variant: 'warning' });
            return;
        }

        try {
            const datosTurno = {
                servicioId: servicioId,
                fecha: fecha
            };
            
            await turnoService.createTurno(datosTurno);
            
            snackbar.enqueue('¡Turno reservado con éxito!', { variant: 'success' });
            setFecha(''); // Limpia la fecha después de reservar
        } catch (err) {
            snackbar.enqueue(`Error al reservar el turno: ${err.message}`, { variant: 'error' });
        }
    }

    return (
        <form onSubmit={manejadorDeEnvios}>
            <h2>Reservar un Turno</h2>
            
            <label>
                Selecciona un servicio:
                <select value={servicioId} onChange={e => setServicioId(e.target.value)}>
                    <option value="" disabled>Selecciona uno...</option>
                    {servicios.map(servicio => (
                        <option key={servicio._id} value={servicio._id}>
                            {servicio.nombre} (${servicio.precio})
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Selecciona fecha y hora:
                <input 
                    type="datetime-local" 
                    value={fecha} 
                    onChange={e => setFecha(e.target.value)}
                />
            </label>

            <button type="submit">Reservar</button>
        </form>
    );
}