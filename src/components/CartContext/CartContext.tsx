import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Products } from "../../types/Products";

interface CartItem extends Products {
  cantidad: number;
}

export interface CartContextType {
  carrito: CartItem[];
  agregarAlCarrito: (producto: Products) => void;
  actualizarCantidad: (id: number, cantidad: number) => void;
  eliminarProducto: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [carrito, setCarrito] = useState<CartItem[]>([]);

  const agregarAlCarrito = (producto: Products) => {
    setCarrito((carritoAnterior) => {
      const yaExisteElProducto = carritoAnterior.findIndex(
        (articulo) => articulo.id === producto.id,
      );
      if (yaExisteElProducto >= 0) {
        const carritoActualizado = [...carritoAnterior];
        carritoActualizado[yaExisteElProducto] = {
          ...carritoActualizado[yaExisteElProducto],
          cantidad: carritoActualizado[yaExisteElProducto].cantidad + 1,
        };
        return carritoActualizado;
      } else {
        return [...carritoAnterior, { ...producto, cantidad: 1 }];
      }
    });
  };

  const actualizarCantidad = (productoId: number, cantidad: number) => {
    setCarrito((carritoAnterior) =>
      carritoAnterior.map((producto) =>
        producto.id === productoId
          ? { ...producto, cantidad: producto.cantidad + cantidad }
          : producto,
      ),
    );
  };

  const eliminarProducto = (productoId: number) => {
    setCarrito((carritoAnterior) =>
      carritoAnterior.filter((producto) => producto.id !== productoId),
    );
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        actualizarCantidad,
        eliminarProducto,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};
