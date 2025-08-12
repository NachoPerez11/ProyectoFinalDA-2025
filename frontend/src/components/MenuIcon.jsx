export default function MenuIcon({
  onClick
}) {
  function onClickHandler(event) {
    event.stopPropagation();
    onClick && onClick();
  }

  return (
    <img src="./lista.png" alt="Menú" onClick={onClickHandler}/>
  );
}