import { ProductList } from "../ProducList/ProductList";
import { Search } from "../../Search/Search";
import { useState } from "react";
import Hero from "../Hero/Hero";

interface HomeProps {
  buscarTermino: string | undefined;
  mostrarBuscador: boolean;
}

export const Home = ({ buscarTermino, mostrarBuscador }: HomeProps) => {
  const [buscarTerminoLocal, setBuscarTerminoLocal] = useState("");

  const handlerBuscar = (termino: string) => {
    setBuscarTerminoLocal(termino);
  };
  return (
    <>
      {!mostrarBuscador && <Hero />}
      {mostrarBuscador && <Search onSearch={handlerBuscar} />}

      <ProductList buscarTermino={buscarTerminoLocal || buscarTermino} />
    </>
  );
};
