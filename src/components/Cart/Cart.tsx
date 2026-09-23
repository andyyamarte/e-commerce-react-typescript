import { useCart } from "../CartContext/CartContext";
import "./Cart.css";

const Cart = () => {
  const { carrito, actualizarCantidad, eliminarProducto } = useCart();
  const handleAumentarCantidad = (productoId: number) => {
    actualizarCantidad(productoId, 1);
  };

  const handleDisminuirCantidad = (productoId: number) => {
    const producto = carrito.find((item) => item.id === productoId);

    if (producto && producto.cantidad > 1) {
      actualizarCantidad(productoId, -1);
    }
  };

  return (
    <div className="cart-container">
      <h2>
        TU <span>CARRITO</span>
      </h2>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <div className="cart-header">
            <p>Producto</p>
            <p>Precio</p>
            <p>Cantidad</p>
            <p>Total</p>
            <p>Acción</p>
          </div>
          <ul className="cart-items">
            {carrito.map((producto) => {
              return (
                <li className="cart-item" key={producto.id}>
                  <div className="product-info">
                    <img
                      src={producto.image || "https://via.placeholder.com/150"}
                      alt={producto.nombre}
                      className="product-images"
                    />
                    <span>{producto.nombre}</span>
                  </div>

                  <p>${producto.precio.toFixed(2)}</p>

                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => handleDisminuirCantidad(producto.id)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="quantity-input"
                      readOnly
                      value={producto.cantidad}
                    />
                    <button
                      className="quantity-btn"
                      onClick={() => handleAumentarCantidad(producto.id)}
                    >
                      +
                    </button>
                  </div>

                  <p>$0</p>

                  <button
                    className="delete-btn"
                    onClick={() => eliminarProducto(producto.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default Cart;
