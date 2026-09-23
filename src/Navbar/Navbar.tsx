import { useCart } from "../components/CartContext/CartContext";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

export interface NavbarProps {
  alternarBuscador: () => void;
}

export const Navbar = ({ alternarBuscador }: NavbarProps) => {
  const { carrito } = useCart();
  const navigate = useNavigate();
  const totalProductos = carrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0,
  );

  const handleHome = () => {
    alternarBuscador();
    navigate("/");
  };

  return (
    <section className="header">
      <h1 className="logo">
        TR<span>Andy</span>{" "}
      </h1>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <div className="icons">
        <button className="search-button" onClick={handleHome}>
          <i className="fas fa-search"></i>
        </button>
        <Link to="/carrito" className="icon-button">
          <i className="fas fa-shopping-cart"></i>
          <span className="counter">{totalProductos}</span>
        </Link>
      </div>
    </section>
  );
};
