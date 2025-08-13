export default function MenuIcon({
  onClick
}) {
  function onClickHandler(event) {
    event.stopPropagation();
    onClick && onClick();
  }

  return (
    <img src="../img/menu.png" alt="Menú" onClick={onClickHandler}/>
  );
}