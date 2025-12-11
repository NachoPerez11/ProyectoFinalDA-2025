import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TurnoCard({ item }) {
    const formatearFecha = (fechaISO) => {
        if (!fechaISO) return 'Fecha inválida';
        const fecha = new Date(fechaISO);
        return fecha.toLocaleString('es-AR', { 
            day: '2-digit', month: '2-digit', year: '2-digit', 
            hour: '2-digit', minute: '2-digit' 
        });
    };

    // Color según estado
    const getColorEstado = (estado) => {
        switch (estado) {
            case 'Confirmado': return '#28a745'; 
            default: return '#ffc107';        
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.servicio}>
                    {item.servicio?.nombre || 'Servicio eliminado'}
                </Text>
                <Text style={[styles.precio]}>
                    ${item.servicio?.precio || item.precio || 0}
                </Text>
            </View>

            <Text style={styles.fecha}>📅 {formatearFecha(item.fecha)}</Text>

            <View style={styles.footer}>
                <Text style={styles.cliente}>
                    👤 {item.cliente?.nombre || item.cliente?.usuario || 'Yo'}
                </Text>
                <View style={[styles.badge, { backgroundColor: getColorEstado(item.estado) }]}>
                    <Text style={styles.estadoText}>{item.estado || 'Pendiente'}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderLeftWidth: 5,
        borderLeftColor: '#003366'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    servicio: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    precio: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#003366',
    },
    fecha: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 10
    },
    cliente: {
        fontSize: 12,
        color: '#888',
        fontStyle: 'italic'
    },
    badge: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
    },
    estadoText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
});