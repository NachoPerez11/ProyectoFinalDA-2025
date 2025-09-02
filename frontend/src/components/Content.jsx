import Login from './Login.jsx';
import { useSession } from './Session.jsx';
import Router from './Router.jsx';

export default function Content() {
  const session = useSession();
  return (
    <div
      className="content"
      style={{
        flexGrow: 1,
      }}
    >
      {!session.isLoggedIn ? <Login /> : <h2>Bienvenido {session.user?.fullName}</h2>}
      <Router />
    </div>
  );
}