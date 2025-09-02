import { useState } from 'react';
import Form from './Form.jsx';
import TextField from './TextField.jsx';
import { login } from '../services/loginService.js';
import { useSnackbar } from './Snackbar.jsx';
import * as api from '../libs/api.js';
import { useSession } from './Session.jsx';


export default function Login() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('1234');
  const session = useSession();
  const snackbar = useSnackbar();

  async function submit() {
    try {
      const data = await login(username,password);
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
      action={submit}
      submitLabel="Ingresar"
    >
      <TextField
        label="Nombre de usuario"
        name="username"
        required={true}
        value={username}
        onChange={e => setUsername(e.target.value)}
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