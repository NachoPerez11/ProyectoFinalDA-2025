import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Form from "./Form";
import TextField from "./TextField"
import MultiSelectField from "./MultiSelectField";
import * as userService from '../services/userService.js';

export default function Usuario() {
  const {uuid} = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    if (uuid) {
      userService.getByUuid(uuid).then(setData); 
      }
    }, [uuid]);

  return <Form title="Editar Usuario">
    <TextField 
    label="Nombre completo"
    name="nombre"
    required={true}
    value={data.nombre || ''}
    onChange={e => setData({...data, nombre: e.target.value})}
    />
    <TextField 
    label="Email"
    name="email"
    required={true}
    value={data.email || ''}
    onChange={e => setData({...data, email: e.target.value})}
    />
    <MultiSelectField
    label="Roles"
    name="roles"
    value={data.roles}
    onChange={newValue => setData({...data, roles: newValue})}
    options={[
        { label: "Administrador", value: "admin" },
        { label: "Operador", value: "operator" }
    ]}
    />
  </Form>
}
