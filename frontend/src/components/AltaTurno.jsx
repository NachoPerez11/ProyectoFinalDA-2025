import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as servicioService from '../services/servicioService.js';
import * as turnoService from '../services/turnoService.js';
import { useSnackbar } from './Snackbar.jsx';
import Form from './Form.jsx'; 
import TextField from './TextField.jsx'; 
import Button from './Button.jsx'; 

export default function AltaTurno() {
    const navigate = useNavigate();
    const snackbar = useSnackbar();
    
    const [servicios, setServicios] = useState([]);
    const [servicioId, setServicioId] = useState('');
    const [fecha, setFecha] = useState('');

    // Cargar Servicios al iniciar
    useEffect(() => {
        servicioService.getServicios()
            .then(data => {
                setServicios(data);
                // Pre-seleccionar el primero si hay servicios disponibles
                if (data.length > 0) {
                    setServicioId(data[0]._id);
                }
            })
            .catch(err => snackbar.enqueue(`Error al cargar servicios: ${err.message}`, { variant: 'error' }));
    }, [snackbar]);

    async function submit(e) {
        e.preventDefault();
        if (!servicioId || !fecha) {
            snackbar.enqueue('Por favor completa todos los campos.', { variant: 'warning' });
            return;
        }
        try {
            const datosTurno = {
                servicioId: servicioId,
                fecha: fecha,
            };
            await turnoService.createTurno(datosTurno);
            snackbar.enqueue('¡Turno reservado con éxito!', { variant: 'success' });
            navigate('/mis-turnos');
        } catch (err) {
            snackbar.enqueue(`Error al reservar: ${err.message}`, { variant: 'error' });
        }
    }

    return (
        <Form onSubmit={submit} title="Reservar turno" submitLabel="Reservar Turno">
            <div>
                <label>Servicio</label>
                <select 
                    value={servicioId} 
                    onChange={e => setServicioId(e.target.value)}
                >
                    {servicios.map(servicio => (
                        <option key={servicio._id} value={servicio._id}>
                            {servicio.nombre} - ${servicio.precio}
                        </option>
                    ))}
                </select>
            </div>
            <TextField 
                label="Fecha y Hora"
                type="datetime-local"
                value={fecha}
                onChange={e => setFecha(e.target.value)}
                required
            />
        </Form>
    );
}