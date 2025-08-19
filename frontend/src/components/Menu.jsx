import { useSession } from './Session.jsx';

export default function Menu() {
  const session = useSession();
  return (
    <nav className="menu">
      <ul><a href="/">Inicio</a></ul>
      {session.isLoggedIn ? <ul><a href="#" onClick={() => session.setIsLoggedIn(false)}>Perfil</a></ul> : null}
      <ul><a href="/about">Acerca de</a></ul>
      <ul><a href="/contact">Contacto</a></ul>
    </nav>
  );
}