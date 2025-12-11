import React from 'react';
import { View, Text, Button } from 'react-native'; // Button y View se usan en AboutScreen todavía
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useSession } from './components/Session';
import LoginScreen from './screens/LoginScreen';
import IndexScreen from './screens/IndexScreen'; 
import UsersScreen from './screens/UsersScreen';
import NuevoTurnoScreen from './screens/NuevoTurnoScreen';


function AboutScreen() { 
    const { logout } = useSession();
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text style={{marginBottom: 20}}>Acerca de la App</Text>
            <Button title="Cerrar Sesión" onPress={logout} color="red" />
        </View>
    ); 
}

const Drawer = createDrawerNavigator();

export default function Layout() {
    const { isInitiated } = useSession();
    
    if (!isInitiated) {
        return <LoginScreen />;
    }
    
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Index">
                <Drawer.Screen name="Index" component={IndexScreen} options={{ title: 'Mis Turnos' }} />
                <Drawer.Screen name="NuevoTurno" component={NuevoTurnoScreen} options={{ title: 'Reservar Turno' }} />
                <Drawer.Screen name="Users" component={UsersScreen} options={{ title: 'Usuarios' }} />
                <Drawer.Screen name="About" component={AboutScreen} options={{ title: 'Perfil / Salir' }} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}