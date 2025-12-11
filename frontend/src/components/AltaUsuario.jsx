import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Form from "./Form";
import TextField from "./TextField";
import RadioSelectField from "./RadioSelectField";
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
    const soyAdmin = session.user?.roles?.includes('admin') || false;
    const soloLectura = soyAdmin && !esMiPerfil;
    const [data, setData] = useState({
        usuario: '',
        password: '',
        nombre: '',
        email: '',
        roles: ['cliente']
    });

    useEffect(() => {
        if (esEdicion && uuidParaEditar) {
            userService.getByUuid(uuidParaEditar)
                .then(fetchedData => {
                    setData(prev => ({ 
                        ...prev,
                        ...fetchedData,
                        usuario: fetchedData.usuario || fetchedData.user || '' 
                    }));
                })
                .catch(err => {
                    console.error(err);
                    snackbar.enqueue('Error al cargar datos: ' + err.message, { variant: 'error' });
                });
        }
    }, [uuidParaEditar, esEdicion, snackbar]);

    async function submit(e) {
        e.preventDefault();
        try {
            if (esEdicion) {
                await userService.update(uuidParaEditar, {
                    usuario: data.usuario,
                    nombre: data.nombre,
                    email: data.email,
                    roles: esMiPerfil ? undefined : data.roles 
                });
                
                if (esMiPerfil) {
                    const usuarioActualizado = {...session.user,
                                                usuario: data.usuario,
                                                nombre: data.nombre,
                                                email: data.email };
                    
                    const tokenSeguro = localStorage.getItem('token') || session.token;

                    if (session.login && tokenSeguro) {
                        session.login(usuarioActualizado, tokenSeguro);
                    }
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
            submitLabel={esEdicion ? "Guardar Cambios" : "Crear Usuario"}>

            
            <TextField
                label="Nombre de Usuario"
                name="usuario"
                required={true}
                value={data.usuario || ''}
                onChange={e => setData({...data, usuario: e.target.value})}
                disabled={esEdicion}
            />
            
            {!esEdicion && (
                <TextField
                    label="Contraseña"
                    name="password"
                    type="password"
                    required={true}
                    value={data.password || ''}
                    onChange={e => setData({...data, password: e.target.value})}
                />
            )}

            <TextField
                label="Nombre Completo"
                name="nombre"
                required={true}
                value={data.nombre || ''}
                onChange={e => setData({...data, nombre: e.target.value})}
                disabled={soloLectura}
            />
            <TextField
                label="Email"
                name="email"
                type="email"
                required={true}
                value={data.email || ''}
                onChange={e => setData({...data, email: e.target.value})}
                disabled={soloLectura}
            />

            {soyAdmin && !esMiPerfil && (
                <RadioSelectField
                    label="Rol Asignado"
                    name="roles"
                    value={data.roles?.[0] || 'cliente'}
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