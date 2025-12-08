import {useEffect, useState} from 'react';
import * as userService from '../services/userService.js';
import Button from './Button.jsx';
import { Link } from 'react-router-dom';

export default function Usuarios() {
  const [users, setUsers] = useState([]);

  useEffect(() => {userService.get().then(setUsers)}, []);

  return <table>
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
          <td><Button><Link to={`/usuario/${user.uuid}`}>Editar</Link></Button></td>
          <td><Button><Link to={`/usuario/${user.uuid}`}>Eliminar</Link></Button></td>
        </tr>
      ))}
    </tbody>
  </table>;
}
