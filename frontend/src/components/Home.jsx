import { useSession } from './Session.jsx';
import Footer from './Footer.jsx'; 

export default function Home() {
    const session = useSession();
    if (!session.user) return null;
    return (
        <>
            <div style={{ textAlign: 'center', marginTop: '3em' }}>
                <h1>¡Hola, {session.user.nombre || session.user.usuario}!</h1>
                <h2>Menú principal</h2>
            </div>
            <Footer />
        </>
    );
}