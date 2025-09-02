import { useEffect, useState } from "react";
import Form from "./Form";
import TextField from "./TextField"
import MultiSelectField from "./MultiSelectField";

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
  <MultiSelectField
  label="Roles"
  name="roles"
  value={data.roles}
  onChange={newValue => setData({...data, roles: newValue})}
  options={[
      { label: "Administrados", value: "admin" },
      { label: "Operador", value: "operator" }
  ]}
  />
</Form>
}
