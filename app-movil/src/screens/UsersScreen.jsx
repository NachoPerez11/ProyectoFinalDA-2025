import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useSession } from '../components/Session';
import { getUsersAPI } from '../services/api';
import UserCard from '../components/UserCard';

export default function UsersScreen() {
    const { token } = useSession();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        try {
            setLoading(true);
            const data = await getUsersAPI(token);
            setUsers(data);
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (user) => {
        Alert.alert("Editar", `Próximamente editar a ${user.nombre}`);
    };

    const handleDelete = (id) => {
        Alert.alert("Eliminar", "¿Seguro querés borrarlo?", [
            { text: "Cancelar" },
            { text: "Borrar", onPress: () => console.log("Borrar ID:", id) }
        ]);
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Gestión de Usuarios</Text>
            
            <FlatList
                data={users}
                keyExtractor={(item) => item._id || item.uuid} 
                renderItem={({ item }) => (
                    <UserCard 
                        item={item} 
                        onEdit={handleEdit} 
                        onDelete={handleDelete} 
                    />
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No hay usuarios registrados.</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    headerTitle: { 
        fontSize: 22, 
        fontWeight: 'bold', 
        margin: 20, 
        textAlign: 'center', 
        color: '#003366' 
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666'
    }
});