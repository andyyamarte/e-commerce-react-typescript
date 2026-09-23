import { useState } from "react";
import type { ChangeEvent } from "react";
import "./Search.css";

interface SearchProps {
  onSearch: (termino: string) => void;
}

export const Search = ({ onSearch }: SearchProps) => {
  const [buscarTermino, setBuscarTermino] = useState("");

  const handleBuscarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const termino = e.target.value;
    setBuscarTermino(termino);
    onSearch(termino);
  };

  return (
    <section className="search">
      <input
        type="search"
        placeholder="buscar"
        className="search-bar"
        value={buscarTermino}
        onChange={handleBuscarChange}
      />
    </section>
  );
};
