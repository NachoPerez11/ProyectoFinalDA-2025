import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, Alert, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSession } from '../components/Session';
import { getServiciosAPI, crearTurnoAPI } from '../services/api';
import { useNavigation } from '@react-navigation/native';

export default function NuevoTurnoScreen() {
    const { token, user } = useSession();
    const navigation = useNavigation();

    const [servicios, setServicios] = useState([]);
    const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
    
    const [fecha, setFecha] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const [loading, setLoading] = useState(false);
    const [loadingServicios, setLoadingServicios] = useState(true);

    useEffect(() => {
        cargarServicios();
    }, []);

    const cargarServicios = async () => {
        try {
            const data = await getServiciosAPI(token);
            setServicios(data);
            if (data.length > 0) setServicioSeleccionado(data[0]._id);
        } catch (error) {
            Alert.alert("Error", "No se pudieron cargar los servicios.");
            console.error(error);
        } finally {
            setLoadingServicios(false);
        }
    };

    const handleConfirmarReserva = async () => {
        if (!servicioSeleccionado) {
            Alert.alert("Error", "Por favor seleccioná un servicio.");
            return;
        }

        try {
            setLoading(true);
            const datos = {
                servicioId: servicioSeleccionado,
                fecha: fecha.toISOString(), 
                cliente: user.uuid
            };
            alert(JSON.stringify(datos));

            await crearTurnoAPI(token, datos);
            
            Alert.alert("¡Éxito!", "Tu turno fue reservado correctamente.", [
                { text: "Ver mis turnos", onPress: () => navigation.navigate('Index') }
            ]);
            
        } catch (error) {
            console.error(error);
            //Alert.alert("Error al reservar", error.message);
        } finally {
            setLoading(false);
        }
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || fecha;
        setShowDatePicker(Platform.OS === 'ios');
        setFecha(currentDate);
        if (Platform.OS === 'android') setShowTimePicker(true); 
    };

    const onChangeTime = (event, selectedDate) => {
        const currentDate = selectedDate || fecha;
        setShowTimePicker(Platform.OS === 'ios');
        setFecha(currentDate);
    };

    if (loadingServicios) return <View style={styles.center}><ActivityIndicator size="large" color="#003366"/></View>;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.titulo}>Reservar Nuevo Turno</Text>

            <Text style={styles.label}>1. Elegí el Servicio:</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={servicioSeleccionado}
                    onValueChange={(itemValue) => setServicioSeleccionado(itemValue)}
                >
                    {servicios.map((s) => (
                        <Picker.Item key={s._id} label={`${s.nombre} - $${s.precio}`} value={s._id} />
                    ))}
                </Picker>
            </View>

            <Text style={styles.label}>2. Elegí Fecha y Hora:</Text>
            <View style={styles.dateContainer}>
                <Text style={styles.fechaTexto}>
                    {fecha.toLocaleString('es-AR', { dateStyle: 'medium', timeStyle: 'short' })}
                </Text>
                <Button title="Cambiar Fecha/Hora" onPress={() => setShowDatePicker(true)} color="#003366" />
            </View>

            {/* Selectores Ocultos que se activan con el botón */}
            {showDatePicker && (
                <DateTimePicker
                    value={fecha}
                    mode="date"
                    display="default"
                    minimumDate={new Date()}
                    onChange={onChangeDate}
                />
            )}
            {showTimePicker && (
                <DateTimePicker
                    value={fecha}
                    mode="time"
                    display="default"
                    onChange={onChangeTime}
                />
            )}

            <View style={styles.botonContainer}>
                {loading ? (
                    <ActivityIndicator size="large" color="#003366" />
                ) : (
                    <TouchableOpacity style={styles.botonConfirmar} onPress={handleConfirmarReserva}>
                        <Text style={styles.textoBoton}>CONFIRMAR RESERVA</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#f8f9fa', flexGrow: 1 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    titulo: { fontSize: 24, fontWeight: 'bold', color: '#003366', textAlign: 'center', marginBottom: 30 },
    label: { fontSize: 18, color: '#333', marginBottom: 10, fontWeight: '600' },
    pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 20, backgroundColor: 'white' },
    dateContainer: { marginBottom: 30, alignItems: 'center' },
    fechaTexto: { fontSize: 18, marginBottom: 10, color: '#003366', fontWeight: 'bold' },
    botonContainer: { marginTop: 20 },
    botonConfirmar: { backgroundColor: '#28a745', padding: 15, borderRadius: 10, alignItems: 'center' },
    textoBoton: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});