import Login from './Login.jsx';
import { useSession } from './Session.jsx';
import Router from './Router.jsx';

export default function Content() {
    const session = useSession();
    return (
        <div>
            {/* Si NO está logueado mostramos Login */}
            {!session.isLoggedIn && <Login />}

            {/* Si está logueado mostramos solo el Router */}
            {session.isLoggedIn && <Router />}
        </div>
    );
}