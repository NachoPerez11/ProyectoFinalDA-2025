import { useState } from 'react';
import Form from './Form.jsx';
import TextField from './TextField.jsx';
import { login } from '../services/loginService.js';
import { useSnackbar } from './Snackbar.jsx';
import * as api from '../libs/api.js';
import { useSession } from './Session.jsx';


export default function Login() {
  const [usuario, setUsuario] = useState();
  const [password, setPassword] = useState();
  const session = useSession();
  const snackbar = useSnackbar();

  async function submit(e) {
    e.preventDefault();
    try {
      const data = await login(usuario,password);
      if(data.token) {
        api.headers.Authorization = `Bearer ${data.token}`;
        session.setIsLoggedIn(true);
        session.setUser(data.user);

        snackbar.enqueue('Ingresó correctamente',{variant: 'success', timeout: '5000'});
      } else {
        snackbar.enqueue('Error al ingresar', {variant: 'error', timeout: '6000'});
      }
    } catch(err) {
      snackbar.enqueue(`Error: ${err.message}`, {variant: 'error', timeout: '6000'});
    }
  }

  return (
    <Form
      title="Iniciar sesión"
      onSubmit={submit}
      submitLabel="Ingresar"
    >
      <TextField
        label="Nombre de usuario"
        name="usuario"
        required={true}
        value={usuario}
        onChange={e => setUsuario(e.target.value)}
      />
      <TextField
        label="Contraseña"
        name="password"
        type="password"
        required={true}
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
    </Form>
  )
}