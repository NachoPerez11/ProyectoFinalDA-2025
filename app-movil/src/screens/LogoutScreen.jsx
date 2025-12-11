import { useSession } from '../components/Session';
import { View, Text, Button } from 'react-native';

export default function LogoutScreen() {
    const { logout } = useSession();
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text style={{marginBottom: 20}}>Acerca de la App</Text>
            <Button title="Cerrar Sesión" onPress={logout} color="red" />
        </View>
    ); 
}