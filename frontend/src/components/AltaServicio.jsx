import { useState } from 'react';
import * as servicioService from '../services/servicioService.js';
import { useSnackbar } from './Snackbar.jsx';
import Form from './Form.jsx';
import TextField from './TextField.jsx';

export default function CrearServicio() {
    const [nombre, setNombre] = useState('');
    const [duracion, setDuracion] = useState('');
    const [precio, setPrecio] = useState('');
    
    const snackbar = useSnackbar();

    async function submit(e) {
        e.preventDefault();
        if (!nombre || !duracion || !precio) {
            snackbar.enqueue('Todos los campos son obligatorios', { variant: 'warning' });
            return;
        }
        try {
            await servicioService.createServicio({
                nombre,
                duracion: Number(duracion),
                precio: Number(precio)
            });

            snackbar.enqueue('Servicio creado con éxito', { variant: 'success' });
            setNombre('');
            setDuracion('');
            setPrecio('');

        } catch (err) {
            snackbar.enqueue(`Error al crear servicio: ${err.message}`, { variant: 'error' });
        }
    }

    return (
        <Form 
            title="Nuevo Servicio" 
            onSubmit={submit}
            submitLabel="Crear Servicio"
        >
            <TextField
                label="Nombre del Servicio"
                name="nombre"
                required={true}
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder="Ej: Corte de Barba"
            />
            
            <TextField
                label="Duración (minutos)"
                name="duracion"
                type="number"
                required={true}
                value={duracion}
                onChange={e => setDuracion(e.target.value)}
                placeholder="Ej: 30"
            />

            <TextField
                label="Precio ($)"
                name="precio"
                type="number"
                required={true}
                value={precio}
                onChange={e => setPrecio(e.target.value)}
                placeholder="Ej: 5000"
            />
        </Form>
    );
}