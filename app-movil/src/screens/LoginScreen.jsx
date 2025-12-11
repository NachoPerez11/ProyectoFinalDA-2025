import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useSession } from '../components/Session';
import { loginAPI } from '../services/api';

export default function LoginScreen() {
    const { login } = useSession();
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!usuario || !password) {
            Alert.alert("Faltan datos", "Por favor escribí usuario y contraseña");
            return;
        }

        try {
            const data = await loginAPI(usuario, password);
            login(data.user, data.token); 
            
        } catch (error) {
            Alert.alert('Error', 'No se pudo conectar. Revisá la consola.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Agenda de Turnos</Text>
            
            <Text>Usuario:</Text>
            <TextInput 
                placeholder="Ingresa tu usuario" 
                style={styles.input}
                value={usuario}
                onChangeText={setUsuario}
                autoCapitalize="none"
            />
            
            <Text>Contraseña:</Text>
            <TextInput 
                placeholder="Ingresa tu contraseña" 
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button title="Ingresar" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }
});