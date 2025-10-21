import { View, Text } from 'react-native';

export default function Screen({ title, children }) {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>{title}</Text>
        {children}
    </View>;
}