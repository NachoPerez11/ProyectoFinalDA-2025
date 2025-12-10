// EN: src/components/AltaUsuario.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Form from "./Form";
import TextField from "./TextField";
// import MultiSelectField from "./MultiSelectField"; <-- CHAU
import RadioSelectField from "./RadioSelectField"; // <-- HOLA
import * as userService from '../services/userService.js';
import { useSnackbar } from './Snackbar.jsx';
import { useSession } from './Session.jsx';

export default function AltaUsuario() {
    const { uuid } = useParams();
    const location = useLocation(); 
    const navigate = useNavigate();
    const snackbar = useSnackbar();
    const session = useSession();

    const esMiPerfil = location.pathname === '/mi-perfil';
    const uuidParaEditar = esMiPerfil ? session.user?.uuid : uuid;
    const esEdicion = !!uuidParaEditar;
    const soyAdmin = session.user?.roles?.includes('admin');

    const [data, setData] = useState({
        usuario: '',
        password: '',
        nombre: '',
        email: '',
        roles: ['cliente'] // Array inicial
    });

    useEffect(() => {
        if (esEdicion && uuidParaEditar) {
            userService.getByUuid(uuidParaEditar)
                .then(fetchedData => {
                    setData(prev => ({ ...prev, ...fetchedData }));
                })
                .catch(err => {
                    console.error(err);
                    snackbar.enqueue('Error al cargar datos: ' + err.message, { variant: 'error' });
                });
        }
    }, [uuidParaEditar, esEdicion]);

    async function submit(e) {
        e.preventDefault();
        try {
            if (esEdicion) {
                await userService.update(uuidParaEditar, {
                    nombre: data.nombre,
                    email: data.email,
                    roles: esMiPerfil ? undefined : data.roles 
                });
                
                if (esMiPerfil) {
                    const usuarioActualizado = { ...session.user, nombre: data.nombre, email: data.email };
                    const token = localStorage.getItem('app_token');
                    if (session.login) session.login(usuarioActualizado, token);
                }

                snackbar.enqueue('Datos actualizados correctamente', { variant: 'success' });
            } else {
                await userService.create(data);
                snackbar.enqueue('Usuario creado con éxito', { variant: 'success' });
            }
            
            setTimeout(() => navigate(-1), 1000);

        } catch (err) {
            snackbar.enqueue('Error al guardar: ' + err.message, { variant: 'error' });
        }
    }

    return (
        <Form 
            title={esEdicion ? "Editar Datos" : "Nuevo Usuario"} 
            onSubmit={submit}
            submitLabel={esEdicion ? "Guardar Cambios" : "Crear Usuario"}
        >
            {!esEdicion && (
                <>
                    <TextField
                        label="Nombre de Usuario"
                        name="usuario"
                        required={true}
                        value={data.usuario || ''}
                        onChange={e => setData({...data, usuario: e.target.value})}
                    />
                    <TextField
                        label="Contraseña"
                        name="password"
                        type="password"
                        required={true}
                        value={data.password || ''}
                        onChange={e => setData({...data, password: e.target.value})}
                    />
                </>
            )}

            <TextField
                label="Nombre Completo"
                name="nombre"
                required={true}
                value={data.nombre || ''}
                onChange={e => setData({...data, nombre: e.target.value})}
            />
            <TextField
                label="Email"
                name="email"
                type="email"
                required={true}
                value={data.email || ''}
                onChange={e => setData({...data, email: e.target.value})}
            />

            {/* Selector de Roles: Radio Button */}
            {soyAdmin && !esMiPerfil && (
                <RadioSelectField
                    label="Rol Asignado"
                    name="roles"
                    // TRUCO 1: Convertimos el Array ['admin'] a String 'admin' para el componente
                    value={data.roles?.[0] || 'cliente'}
                    
                    // TRUCO 2: Recibimos String 'admin' y guardamos Array ['admin'] para el backend
                    onChange={newValue => setData({...data, roles: [newValue]})}
                    
                    options={[
                        { label: "Administrador", value: "admin" },
                        { label: "Cliente", value: "cliente" }
                    ]}
                />
            )}
        </Form>
    );
}