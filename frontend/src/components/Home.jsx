import { useSession } from './Session.jsx';

export default function Home() {
    const session = useSession();

    if (!session.user) return null;
    return (
        <div>
            <h1>¡Hola, {session.user.nombre || session.user.usuario}!</h1>
            <h3>Bienvenido al Panel de Control</h3>
            <p>Seleccioná una opción del menú superior para comenzar.</p>
        </div>
    );
}