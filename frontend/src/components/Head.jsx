import MenuIcon from './MenuIcon.jsx';

export default function Head({
  setMenuShowed,
}) {
  return (
    <div
      className="head"
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <MenuIcon
        onClick={() => setMenuShowed(value => !value)}
      />
      <h1
        style={{
          margin: 0,
        }}
      >
        TUDS - DA - 2025
      </h1>
    </div>
  );
}