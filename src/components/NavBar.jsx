import CartWidget from "./CartWidget.jsx";

const NavBar = () => {
  return (
    <header className="navbar">
      <nav className="nav">
        <a href="#" className="logo">Tienda Quinteros</a>
        <ul className="nav-links">
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Productos</a></li>
          <li><a href="#">Ofertas</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
        <CartWidget />
      </nav>
    </header>
  );
};

export default NavBar;