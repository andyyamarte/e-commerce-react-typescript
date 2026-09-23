import { useParams } from "react-router-dom";
import "./DetailsProduct.css";
import { useEffect, useState } from "react";
import type { Products } from "../../types/Products";
import { useCart } from "../CartContext/CartContext";

const DetailsProduct = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState<Products | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { agregarAlCarrito } = useCart();

  const handlerAgregarAlCarrito = () => {
    if (producto) {
      agregarAlCarrito(producto);
    }
  };

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(
          `https://api-ten-jet.vercel.app/products/${id}`,
        );

        if (!response.ok) {
          throw new Error("Error al cargar los detalles del producto");
        }

        const data = await response.json();
        setProducto(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ha ocurrido un error");
        }
      }
    };

    fetchProducto();
  }, [id]);
  if (error) {
    return <h2 className="error-message">{error}</h2>;
  }

  return (
    <div className="product-details">
      {producto ? (
        <>
          <img
            src={producto.image}
            alt={producto.nombre}
            className="image-small"
          />
          <img src={producto.image} alt={producto.nombre} />
          <div className="product-infos">
            <h1>{producto.nombre}</h1>
            <p className="price">{producto.precio}</p>
            <p className="description">{producto.descripcion}</p>
            <div className="size-options">
              <button>S</button>
              <button>M</button>
              <button>L</button>
              <button>XL</button>
            </div>
            <button onClick={handlerAgregarAlCarrito} className="add-to-cart">
              Añadir al carrito
            </button>
            <p className="note">
              Producto 100% original. El pago contra reembolso está disponible
              para este producto. Politíca de devolución y cambio fácil dentro
              de los 7 días.
            </p>
          </div>
        </>
      ) : (
        <p>Cargando producto ...</p>
      )}
    </div>
  );
};

export default DetailsProduct;
