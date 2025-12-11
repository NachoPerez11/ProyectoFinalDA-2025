import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Hooks de navegación
import * as servicioService from '../services/servicioService.js';
import * as turnoService from '../services/turnoService.js';
import { useSnackbar } from './Snackbar.jsx';
import { useSession } from './Session.jsx'; // Para saber si es admin

export default function AltaTurno() {
    const { id } = useParams(); // Si hay ID, es edición
    const navigate = useNavigate();
    const { user } = useSession();
    const snackbar = useSnackbar();
    
    const esEdicion = !!id;
    const esAdmin = user?.roles?.includes('admin');

    const [servicios, setServicios] = useState([]);
    
    // Estados del formulario
    const [servicioId, setServicioId] = useState('');
    const [fecha, setFecha] = useState('');
    const [estado, setEstado] = useState('Pendiente'); // Nuevo estado

    // 1. Cargar Servicios
    useEffect(() => {
        servicioService.getServicios()
            .then(data => {
                setServicios(data);
                // Si es nuevo turno, pre-seleccionar el primero
                if (!esEdicion && data.length > 0) {
                    setServicioId(data[0]._id);
                }
            })
            .catch(err => snackbar.enqueue(`Error servicios: ${err.message}`, { variant: 'error' }));
    }, [esEdicion, snackbar]);

    // 2. Cargar Turno si es Edición
    useEffect(() => {
        if (esEdicion) {
            // Asumo que tenés un getById en turnoService, si no, avisame
            turnoService.getTurnoById(id)
                .then(turno => {
                    setServicioId(turno.servicio?._id || turno.servicio); // Maneja si viene objeto o ID
                    // Formato fecha para input datetime-local: YYYY-MM-DDTHH:mm
                    const dateObj = new Date(turno.fecha);
                    dateObj.setMinutes(dateObj.getMinutes() - dateObj.getTimezoneOffset());
                    setFecha(dateObj.toISOString().slice(0, 16));
                    
                    setEstado(turno.estado || 'Pendiente');
                })
                .catch(err => snackbar.enqueue(`Error cargando turno: ${err.message}`, { variant: 'error' }));
        }
    }, [id, esEdicion, snackbar]);

    // Maneja el envío del formulario (Crear o Editar)
    async function manejadorDeEnvios(e) {
        e.preventDefault();
        
        if (!servicioId || !fecha) {
            snackbar.enqueue('Complete los campos obligatorios.', { variant: 'warning' });
            return;
        }

        try {
            const datosTurno = {
                servicioId: servicioId,
                fecha: fecha,
                estado: estado // Mandamos el estado (importante para Admin)
            };
            
            if (esEdicion) {
                // Modo Edición (PATCH/PUT)
                await turnoService.update(id, datosTurno);
                snackbar.enqueue('Turno actualizado correctamente', { variant: 'success' });
                navigate(-1); // Volver atrás
            } else {
                // Modo Creación
                await turnoService.createTurno(datosTurno);
                snackbar.enqueue('¡Turno reservado con éxito!', { variant: 'success' });
                setFecha(''); // Limpiar si es creación
                navigate('/mis-turnos'); // O donde quieras redirigir
            }
            
        } catch (err) {
            snackbar.enqueue(`Error: ${err.message}`, { variant: 'error' });
        }
    }

    return (
        <form onSubmit={manejadorDeEnvios} style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>{esEdicion ? 'Editar Turno' : 'Reservar Turno'}</h2>
            
            <label style={{ display: 'block', marginBottom: '10px' }}>
                Servicio:
                <select 
                    value={servicioId} 
                    onChange={e => setServicioId(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    disabled={esEdicion && !esAdmin} // Solo admin puede cambiar servicio al editar (opcional)
                >
                    <option value="" disabled>Selecciona uno...</option>
                    {servicios.map(servicio => (
                        <option key={servicio._id} value={servicio._id}>
                            {servicio.nombre} (${servicio.precio})
                        </option>
                    ))}
                </select>
            </label>

            <label style={{ display: 'block', marginBottom: '10px' }}>
                Fecha y Hora:
                <input 
                    type="datetime-local" 
                    value={fecha} 
                    onChange={e => setFecha(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
            </label>

            {/* SECCIÓN ESTADO: Solo visible para ADMIN */}
            {esAdmin && esEdicion && (
                <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
                    <label style={{ fontWeight: 'bold' }}>Cambiar Estado (Admin):</label>
                    <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                        <label>
                            <input 
                                type="radio" 
                                name="estado" 
                                value="Pendiente" 
                                checked={estado === 'Pendiente'} 
                                onChange={e => setEstado(e.target.value)}
                            /> Pendiente
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="estado" 
                                value="Confirmado" 
                                checked={estado === 'Confirmado'} 
                                onChange={e => setEstado(e.target.value)}
                            /> <span style={{ color: 'green' }}>Confirmado</span>
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="estado" 
                                value="Cancelado" 
                                checked={estado === 'Cancelado'} 
                                onChange={e => setEstado(e.target.value)}
                            /> <span style={{ color: 'red' }}>Cancelado</span>
                        </label>
                    </div>
                    <small style={{ color: '#666' }}>Si seleccionas "Cancelado", el turno dejará de verse en la lista principal.</small>
                </div>
            )}

            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                {esEdicion ? 'Guardar Cambios' : 'Reservar'}
            </button>
        </form>
    );
}