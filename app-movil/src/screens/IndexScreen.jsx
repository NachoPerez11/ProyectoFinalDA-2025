import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, RefreshControl, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // <--- Importante para navegar
import { useSession } from '../components/Session';
import { getTurnosAPI } from '../services/api';
import TurnoCard from '../components/TurnoCard';

export default function IndexScreen() {
    const { token, user } = useSession(); 
    const navigation = useNavigation(); // <--- Hook de navegación
    const [turnos, setTurnos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        cargarTurnos();
    }, []);

    const cargarTurnos = async () => {
        try {
            if (!refreshing) setLoading(true);
            
            const data = await getTurnosAPI(token);

            const miID = user._id; 
            const misTurnos = data.filter(t => {
                const clienteidEnTurno = (t.cliente && typeof t.cliente === 'object') 
                                           ? t.cliente._id 
                                           : t.cliente;
                return clienteidEnTurno === miID;
            });

            setTurnos(misTurnos);

        } catch (error) {
            console.error(error);
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        cargarTurnos();
    };

    const turnosVisibles = turnos.filter(t => t.estado !== 'Cancelado');
    const irAReservar = () => {
        navigation.navigate('NuevoTurno');
    };

    if (loading) {
        return <View style={styles.center}><ActivityIndicator size="large" color="#003366" /></View>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Mis Turnos</Text>
            
            <TouchableOpacity style={styles.botonReservar} onPress={irAReservar}>
                <Text style={styles.textoBoton}>Reservar Nuevo Turno</Text>
            </TouchableOpacity>

            <FlatList
                data={turnosVisibles}
                keyExtractor={(item) => item.uuid || item._id || Math.random().toString()} 
                renderItem={({ item }) => <TurnoCard item={item} />}
                contentContainerStyle={{ paddingBottom: 20 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={
                    <View style={styles.center}>
                        <Text style={styles.vacio}>No tienes turnos reservados.</Text>
                        <Text style={styles.subvacio}>¡Usá el botón de arriba para reservar!</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#003366',
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 10,
    },
    botonReservar: {
        backgroundColor: '#003366', 
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginHorizontal: 40,
        marginBottom: 15,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    textoBoton: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    vacio: {
        fontSize: 18,
        color: '#666',
        marginTop: 20
    },
    subvacio: {
        fontSize: 14,
        color: '#999',
        marginTop: 5
    }
});