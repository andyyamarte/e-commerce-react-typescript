import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import "./ProductList.css";
import type { Products } from "../../types/Products";
import { useNavigate } from "react-router-dom";

interface ProductListProps {
  buscarTermino?: string;
}

export const ProductList = ({ buscarTermino }: ProductListProps) => {
  const [productos, setProductos] = useState<Products[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [orden, setOrden] = useState<string>("Relevante");
  const [filtros, setFiltros] = useState<{
    categoria: string[];
    tipo: string[];
  }>({
    categoria: [],
    tipo: [],
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("https://api-ten-jet.vercel.app/products");

        if (!response.ok) {
          throw new Error("Error al cargar los productos");
        }

        const data: Products[] = await response.json();
        setProductos(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ha ocurrido un error");
        }
      }
    };

    fetchProductos();
  }, []);

  const toggleFiltros = (tipoFiltro: "categoria" | "tipo", valor: string) => {
    setFiltros((prev) => ({
      ...prev,
      [tipoFiltro]: prev[tipoFiltro].includes(valor)
        ? prev[tipoFiltro].filter((item) => item !== valor)
        : [...prev[tipoFiltro], valor],
    }));
  };

  const normalizarTexto = (texto: string) => {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };
  const productosFiltrados = productos.filter((producto) => {
    const matchCategoria =
      filtros.categoria.length === 0 ||
      filtros.categoria.includes(producto.categoria);

    const matchTipo =
      filtros.tipo.length === 0 || filtros.tipo.includes(producto.tipo ?? "");

    const matchBuscar =
      !buscarTermino ||
      normalizarTexto(producto.nombre).includes(
        normalizarTexto(buscarTermino),
      ) ||
      normalizarTexto(producto.descripcion).includes(
        normalizarTexto(buscarTermino),
      );

    return matchCategoria && matchTipo && matchBuscar;
  });

  const handlerOrdenChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setOrden(e.target.value);
  };

  const productosOrdenados = [...productosFiltrados].sort((a, b) => {
    if (orden === "Precio: Menor a Mayor") {
      return a.precio - b.precio;
    }

    if (orden === "Precio: Mayor a Menor") {
      return b.precio - a.precio;
    }

    return 0;
  });
  const handlerImageClick = (id: number): void => {
    navigate(`/producto/${id}`);
  };
  return (
    <section className="main-content">
      <aside className="filters">
        <h2>Filtros</h2>

        <div className="filters-category">
          <div className="filter-category">
            <h3>Categorias</h3>

            <label>
              <input
                type="checkbox"
                onChange={() => toggleFiltros("categoria", "Hombres")}
              />
              <span>Hombres</span>
            </label>

            <label>
              <input
                type="checkbox"
                onChange={() => toggleFiltros("categoria", "Mujeres")}
              />
              <span>Mujeres</span>
            </label>

            <label>
              <input
                type="checkbox"
                onChange={() => toggleFiltros("categoria", "Niños")}
              />
              <span>Niños</span>
            </label>
          </div>

          <div className="filter-category">
            <h3>Tipos</h3>

            <label>
              <input
                type="checkbox"
                onChange={() => toggleFiltros("tipo", "Prendas de abrigos")}
              />
              <span>Prendas de abrigos</span>
            </label>

            <label>
              <input
                type="checkbox"
                onChange={() => toggleFiltros("tipo", "Ropa interior")}
              />
              <span>Ropa interior</span>
            </label>

            <label>
              <input
                type="checkbox"
                onChange={() => toggleFiltros("tipo", "Calzado")}
              />
              <span>Calzado</span>
            </label>
          </div>
        </div>
      </aside>

      <main className="collections">
        <div className="options">
          <h2>TODAS LAS COLECCIONES</h2>

          <div className="sort-options">
            <label>
              Ordenar por:
              <select onChange={handlerOrdenChange} value={orden}>
                <option>Relevante</option>
                <option>Precio: Menor a Mayor</option>
                <option>Precio: Mayor a Menor</option>
              </select>
            </label>
          </div>
        </div>

        <div className="products">
          {error ? (
            <p className="error-message">{error}</p>
          ) : productosFiltrados.length > 0 ? (
            productosOrdenados.map((producto) => (
              <div className="product-card" key={producto.id}>
                <img
                  src={producto.image}
                  alt={producto.nombre}
                  className="product-image"
                  onClick={() => handlerImageClick(producto.id)}
                />

                <h3>{producto.nombre}</h3>

                <p>{producto.precio}</p>
              </div>
            ))
          ) : (
            <p className="no-results">
              No hay productos que coincidan con los filtros seleccionados
            </p>
          )}
        </div>
      </main>
    </section>
  );
};
