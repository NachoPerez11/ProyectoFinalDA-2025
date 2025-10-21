import { useState } from 'react';
import { TextInput, Button, Alert } from 'react-native';
import { useSession } from '../components/Session';
import Screen from '../components/Screen';

export default function LoginScreen() {
    const { setIsInitiated } = useSession();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    async function handleLogin() {
        try {
            const response = await fetch('https://tu-backend.com/api/login', 
                {method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })});
                if (!response.ok) throw new Error('Credenciales inválidas');
                const data = await response.json();
                setIsInitiated(true);
        } catch (error) {
            Alert.alert('Error de inicio de sesión', error.message);
        }
    }
    return <Screen title="Iniciar Sesión">
        <TextInput placeholder="Usuario" value={username} onChangeText={setUsername} 
            style={{ width: '80%', borderWidth: 1, padding: 10, marginBottom: 10}}/>
        <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry
            style={{ width: '80%', borderWidth: 1, padding: 10, marginBottom: 20}}/>
        <Button title="Ingresar" onPress={handleLogin} />
    </Screen>;
}
