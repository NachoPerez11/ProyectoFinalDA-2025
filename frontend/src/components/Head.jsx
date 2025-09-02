import Menu from "./Menu";
import useSession from "./Session";

export default function Head() {
  const session = useSession
  return (
    <div className="head">
      <h1>TUDS - DA - 2025</h1>
      <Menu/>
      <h2>{session.user?.fullName}</h2>
    </div>
  );
}