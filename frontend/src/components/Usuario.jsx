import { useEffect, useState } from "react";
import Form from "./Form";
import TextField from "./TextField"

export default function Usuario() {
  const {uuid} = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    userService.get().then(data => setData(data[0]));
  }, [uuid]);

  return <Form title="Editar Usuario">
    <TextField 
    label="Nombre completo"
    name="fullName"
    required={true}
    value={data.fullName}
    onChange={e => setData({...data, fullName: e.target.value})}
    />
    <TextField 
    label="Email"
    name="email"
    required={true}
    value={data.email}
    onChange={e => setData({...data, email: e.target.value})}
    />
    <TextField 
    label="Roles"
    name="roles"
    required={true}
    value={data.roles}
    onChange={e => setData({...data, roles: e.target.value})}
    />
  </Form>
}
