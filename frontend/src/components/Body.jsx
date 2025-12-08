import Menu from './Menu.jsx';
import Content from './Content.jsx';

export default function Body({
  menuShowed,
}) {
  return (
    <div>
      { menuShowed && <Menu /> }
      <Content />
    </div>
  );
}