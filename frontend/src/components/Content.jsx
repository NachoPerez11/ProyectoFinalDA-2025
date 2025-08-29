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
      {!session.isLoggedIn ? <Login /> : <div>Bienvenido {session.username}</div>}
      <Router />
    </div>
  );
}