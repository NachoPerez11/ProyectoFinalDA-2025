import { useEffect, useState } from 'react';
import * as userService from '../services/userService.js';
import Button from './Button.jsx';
import { Link } from 'react-router-dom';

export default function Usuarios() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.get().then(setUsers);
  }, []);

  async function handleEliminar(uuid) {
    const confirmado = window.confirm('¿Estás seguro de que querés eliminar este usuario?');
    if (confirmado) {
      try {
        await userService.remove(uuid); 
        setUsers(prevUsers => prevUsers.filter(user => user.uuid !== uuid));
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Hubo un error al intentar eliminar el usuario.");
      }
    }
  }

  return (
    <table className='tabla'>
      <thead>
        <tr>
          <th>Nombre de usuario</th>
          <th>Nombre completo</th>
          <th>Email</th>
          <th>Roles</th>
          <th>Editar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.uuid}>
            <td>{user.usuario}</td>
            <td>{user.nombre}</td>
            <td>{user.email}</td>
            <td>{user.roles.join(", ")}</td>
            <td><Button><Link to={`/admin/usuarios/${user.uuid}`}>Editar</Link></Button></td>
            <td><Button  onClick={() => handleEliminar(user.uuid)}>Eliminar</Button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}