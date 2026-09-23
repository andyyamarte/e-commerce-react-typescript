import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Navbar } from "./Navbar/Navbar";
import DetailsProduct from "./components/DetailsProduct/DetailsProduct";
import { CartProvider } from "./components/CartContext/CartContext";
import Cart from "./components/Cart/Cart";

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/producto/:id" element={<DetailsProduct />} />
            <Route path="/carrito" element={<Cart />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
