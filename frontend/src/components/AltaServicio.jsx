import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as servicioService from '../services/servicioService.js';
import { useSnackbar } from './Snackbar.jsx';
import Form from './Form.jsx';
import TextField from './TextField.jsx';

export default function AltaServicio() {
    const [nombre, setNombre] = useState('');
    const [duracion, setDuracion] = useState('');
    const [precio, setPrecio] = useState('');
    
    const { id } = useParams(); // Capturamos el ID de la URL
    const navigate = useNavigate();
    const snackbar = useSnackbar();

    const esEdicion = !!id && id !== 'alta';

    useEffect(() => {
        // Si es edición, cargamos los datos del servicio
        if (esEdicion) {
            cargarServicio();
        }
    }, [id]);

    async function cargarServicio() {
        try {
            const servicio = await servicioService.getById(id);
            setNombre(servicio?.nombre);
            setDuracion(servicio?.duracion);
            setPrecio(servicio?.precio);
        } catch (err) {
            snackbar.enqueue(`Error al cargar el servicio: ${err.message}`, { variant: 'error' });
            navigate('/admin/servicios'); // Si falla, volvemos a la lista
        }
    }

    async function submit(e) {
        e.preventDefault();
        if (!nombre || !duracion || !precio) {
            snackbar.enqueue('Todos los campos son obligatorios', { variant: 'warning' });
            return;
        }
        const datosServicio = {
            nombre,
            duracion: Number(duracion),
            precio: Number(precio)
        };

        try {
            if (esEdicion) {
                await servicioService.update(id, datosServicio);
                snackbar.enqueue('Servicio actualizado con éxito', { variant: 'success' });
            } else {
                await servicioService.createServicio(datosServicio);
                snackbar.enqueue('Servicio creado con éxito', { variant: 'success' });
            }
            navigate('/admin/servicios'); 
        } catch (err) {
            snackbar.enqueue(`Error al guardar: ${err.message}`, { variant: 'error' });
        }
    }

    return (
        <Form 
            title={esEdicion ? "Editar Servicio" : "Nuevo Servicio"} 
            onSubmit={submit}
            submitLabel={esEdicion ? "Guardar Cambios" : "Crear Servicio"}
        >
            <TextField
                label="Nombre del Servicio"
                name="nombre"
                required={true}
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
            
            <TextField
                label="Duración (minutos)"
                name="duracion"
                type="number"
                required={true}
                value={duracion}
                onChange={e => setDuracion(e.target.value)}
            />

            <TextField
                label="Precio ($)"
                name="precio"
                type="number"
                required={true}
                value={precio}
                onChange={e => setPrecio(e.target.value)}
            />
        </Form>
    );
}