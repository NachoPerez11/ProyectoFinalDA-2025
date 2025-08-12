import { useState } from 'react';
import Form from './Form.jsx';
import TextField from './TextField.jsx';
import { useModal } from './Modal.jsx';
import { useSnackbar } from './Snackbar.jsx'

export default function Login() {
  const [username, setUsername] = useState('1');
  const [password, setPassword] = useState('1');
  const {open: openModal} = useModal();
  const snackbar = useSnackbar();

  function submit() {
    //openModal('Ingresando...');
    //setTimeout(() => close(), 2500);
    snackbar.enqueue('Ingresando', {variant: 'info', timeout: '3500'});
    snackbar.enqueue('Ingresó correctamente',{variant: 'success', timeout: '2000'});
    snackbar.enqueue('Error', {variant: 'error', timeout: '4000'});
  }

  return (
    <Form
      title="Iniciar sesión"
      action={submit}
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