import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useSession } from './components/Session';
import LoginScreen from './screens/LoginScreen';
import IndexScreen from './screens/IndexScreen'; 
import UserScreen from './screens/UserScreen';
import NuevoTurnoScreen from './screens/NuevoTurnoScreen';
import LogoutScreen from './screens/LogoutScreen';

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
                <Drawer.Screen name="User" component={UserScreen} options={{ title: 'Mi Perfil' }} />
                <Drawer.Screen name="Logout" component={LogoutScreen} options={{ title: 'Perfil / Salir' }} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}