// src/components/UserCard.jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function UserCard({ item, onEdit, onDelete }) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.nombre}>{item.nombre || item.usuario}</Text>
                <Text style={styles.email}>{item.email}</Text>
                <Text style={styles.rol}>Rol: {item.roles ? item.roles.join(', ') : 'usuario'}</Text>
            </View>
            
            {/* Botones de acción [cite: 63, 64] */}
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => onEdit(item)} style={styles.btnEdit}>
                    <Text style={styles.btnText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDelete(item._id)} style={styles.btnDelete}>
                    <Text style={styles.btnText}>Borrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        elevation: 3, // Sombra en Android [cite: 100]
        shadowColor: '#000', // Sombra en iOS [cite: 101]
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    nombre: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    email: { fontSize: 14, color: '#666', marginTop: 4 },
    rol: { fontSize: 12, color: '#007bff', marginTop: 4, fontWeight: 'bold' },
    actions: { flexDirection: 'row', marginTop: 10, justifyContent: 'flex-end', gap: 10 },
    btnEdit: { backgroundColor: '#ffc107', padding: 5, borderRadius: 4 },
    btnDelete: { backgroundColor: '#dc3545', padding: 5, borderRadius: 4 },
    btnText: { color: 'white', fontSize: 12, fontWeight: 'bold' }
});