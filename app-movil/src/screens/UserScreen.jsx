import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useSession } from '../components/Session';
import { updateUserAPI } from '../services/api';

export default function UserScreen() {
    const { user, token } = useSession();
    
    const userId = user.uuid;

    const [nombre, setNombre] = useState(user.nombre || '');
    const [usuario, setUsuario] = useState(user.usuario || '');
    const [email, setEmail] = useState(user.email || '');
    const [telefono, setTelefono] = useState(user.telefono || '');
    
    const [loading, setLoading] = useState(false);

    const handleGuardarCambios = async () => {
        if (!nombre || !email) {
            Alert.alert("Atención", "El nombre y el email son obligatorios.");
            return;
        }

        try {
            setLoading(true);

            const datosNuevos = {
                nombre,
                usuario,
                email,
                telefono
            };

            await updateUserAPI(token, userId, datosNuevos);

            Alert.alert(
                "¡Actualizado!", 
                "Tus datos se guardaron correctamente. \n\nNota: Es posible que necesites volver a iniciar sesión para ver los cambios reflejados en el menú.",
                [{ text: "OK" }]
            );

        } catch (error) {
            console.error(error);
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.titulo}>Mi Perfil</Text>
            
            <View style={styles.card}>
                <Text style={styles.label}>Nombre Completo:</Text>
                <TextInput 
                    style={styles.input}
                    value={nombre}
                    onChangeText={setNombre}
                />

                <Text style={styles.label}>Usuario (Login):</Text>
                <TextInput 
                    style={[styles.input, styles.inputDisabled]}
                    value={usuario}
                    onChangeText={setUsuario}
                    editable={false} 
                />

                <Text style={styles.label}>Email:</Text>
                <TextInput 
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                {loading ? (
                    <ActivityIndicator size="large" color="#003366" style={{marginTop: 20}} />
                ) : (
                    <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardarCambios}>
                        <Text style={styles.textoBoton}>GUARDAR CAMBIOS</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#003366',
        textAlign: 'center',
        marginBottom: 20,
    },
    card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    label: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    inputDisabled: {
        backgroundColor: '#e9ecef',
        color: '#6c757d'
    },
    botonGuardar: {
        backgroundColor: '#003366',
        padding: 15,
        borderRadius: 10,
        marginTop: 30,
        alignItems: 'center',
    },
    textoBoton: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});