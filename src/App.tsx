import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Navbar } from "./Navbar/Navbar";
import DetailsProduct from "./components/DetailsProduct/DetailsProduct";
import { CartProvider } from "./components/CartContext/CartContext";
import Cart from "./components/Cart/Cart";
import { useState } from "react";
import { Search } from "./Search/Search";

function App() {
  const [buscaTermino, setBuscarTermino] = useState<string | undefined>();
  const [mostrarBuscador, setMostrarBuscador] = useState(false);

  const handlerBuscar = (termino: string) => {
    setBuscarTermino(termino.toLowerCase());
  };

  const alternarBuscador = () => {
    setMostrarBuscador(!mostrarBuscador);
  };

  return (
    <>
      <CartProvider>
        <Router>
          <Navbar alternarBuscador={alternarBuscador} />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  buscarTermino={buscaTermino}
                  mostrarBuscador={mostrarBuscador}
                />
              }
            />
            <Route path="/producto/:id" element={<DetailsProduct />} />
            <Route path="/carrito" element={<Cart />} />
            <Route
              path="/search"
              element={<Search onSearch={handlerBuscar} />}
            />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
