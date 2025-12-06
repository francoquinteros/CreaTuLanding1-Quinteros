// App.jsx
import { BrowserRouter, Routes, Route, Link, NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

/* =======================
   Datos mockeados (Mundo Auto)
   ======================= */

const AUTOS = [
  {
    id: "1",
    name: "Sedán Compacto - Mundo Auto",
    category: "sedan",
    price: 8500000,
    description: "Sedán compacto ideal para la ciudad, bajo consumo y gran confort.",
    stock: 5,
  },
  {
    id: "2",
    name: "SUV Familiar - Mundo Auto",
    category: "suv",
    price: 12500000,
    description: "SUV amplia y cómoda, perfecta para viajes en familia.",
    stock: 3,
  },
  {
    id: "3",
    name: "Pickup 4x4 - Mundo Auto",
    category: "pickup",
    price: 15500000,
    description: "Pickup 4x4 lista para el trabajo pesado y la aventura.",
    stock: 4,
  },
  {
    id: "4",
    name: "Sedán Premium - Mundo Auto",
    category: "sedan",
    price: 17500000,
    description: "Sedán de alta gama con tecnología de última generación.",
    stock: 2,
  },
  {
    id: "5",
    name: "SUV Deportiva - Mundo Auto",
    category: "suv",
    price: 19500000,
    description: "SUV con diseño deportivo y excelente performance.",
    stock: 1,
  },
];

const TIMEOUT = 800;

// Promises simulando llamadas asíncronas

const getAutos = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(AUTOS);
    }, TIMEOUT);
  });
};

const getAutosByCategory = (categoryId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(AUTOS.filter((auto) => auto.category === categoryId));
    }, TIMEOUT);
  });
};

const getAutoById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const auto = AUTOS.find((a) => a.id === id);
      auto ? resolve(auto) : reject("Auto no encontrado");
    }, TIMEOUT);
  });
};

/* =======================
   Componentes de presentación
   ======================= */

function NavBar() {
  const categories = [
    { id: "sedan", name: "Sedanes" },
    { id: "suv", name: "SUV" },
    { id: "pickup", name: "Pickups" },
  ];

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        backgroundColor: "#111827",
        color: "#f9fafb",
      }}
    >
      <Link to="/" style={{ textDecoration: "none", color: "#fbbf24" }}>
        <h1 style={{ margin: 0 }}>Mundo Auto</h1>
      </Link>

      <nav style={{ display: "flex", gap: "1rem" }}>
        {categories.map((cat) => (
          <NavLink
            key={cat.id}
            to={`/category/${cat.id}`}
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "#fbbf24" : "#e5e7eb",
              fontWeight: isActive ? "bold" : "normal",
            })}
          >
            {cat.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

function ItemList({ autos }) {
  if (!autos.length) {
    return <p>No se encontraron autos para esta categoría.</p>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1rem",
        marginTop: "1rem",
      }}
    >
      {autos.map((auto) => (
        <Item key={auto.id} auto={auto} />
      ))}
    </div>
  );
}

function Item({ auto }) {
  return (
    <article
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "0.5rem",
        padding: "1rem",
      }}
    >
      <h3>{auto.name}</h3>
      <p>Categoría: {auto.category.toUpperCase()}</p>
      <p>Precio: ${auto.price.toLocaleString("es-AR")}</p>
      <Link
        to={`/item/${auto.id}`}
        style={{
          display: "inline-block",
          marginTop: "0.5rem",
          padding: "0.4rem 0.8rem",
          backgroundColor: "#1d4ed8",
          color: "#f9fafb",
          borderRadius: "0.375rem",
          textDecoration: "none",
        }}
      >
        Ver detalle
      </Link>
    </article>
  );
}

function ItemDetail({ auto }) {
  const handleAdd = (quantity) => {
    // Luego se conecta con el carrito
    console.log(`Agregaste ${quantity} unidades de: ${auto.name}`);
  };

  return (
    <article
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "0.5rem",
        padding: "1.5rem",
        maxWidth: "600px",
      }}
    >
      <h2>{auto.name}</h2>
      <p>
        <strong>Categoría:</strong> {auto.category.toUpperCase()}
      </p>
      <p>
        <strong>Precio:</strong> ${auto.price.toLocaleString("es-AR")}
      </p>
      <p>
        <strong>Descripción:</strong> {auto.description}
      </p>
      <p>
        <strong>Stock disponible:</strong> {auto.stock}
      </p>

      <hr style={{ margin: "1rem 0" }} />

      <h3>Agregar al carrito</h3>
      <ItemCount initial={1} stock={auto.stock} onAdd={handleAdd} />
    </article>
  );
}

function ItemCount({ initial = 1, stock, onAdd }) {
  const [count, setCount] = useState(initial);

  const handleDecrement = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleIncrement = () => {
    if (count < stock) setCount(count + 1);
  };

  const handleAdd = () => {
    if (stock === 0) return;
    onAdd(count);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <button onClick={handleDecrement} disabled={count <= 1}>
        -
      </button>
      <span>{count}</span>
      <button onClick={handleIncrement} disabled={count >= stock}>
        +
      </button>
      <button
        onClick={handleAdd}
        disabled={stock === 0}
        style={{
          padding: "0.4rem 0.8rem",
          borderRadius: "0.375rem",
          border: "none",
          backgroundColor: stock === 0 ? "#9ca3af" : "#16a34a",
          color: "#f9fafb",
          cursor: stock === 0 ? "not-allowed" : "pointer",
        }}
      >
        Agregar al carrito
      </button>
    </div>
  );
}

function NotFound() {
  return (
    <section style={{ padding: "2rem" }}>
      <h1>404</h1>
      <p>La página que estás buscando no existe en Mundo Auto.</p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#1d4ed8",
          color: "#f9fafb",
          borderRadius: "0.375rem",
          textDecoration: "none",
        }}
      >
        Volver al catálogo
      </Link>
    </section>
  );
}

/* =======================
   Componentes contenedores
   ======================= */

function ItemListContainer({ greeting }) {
  const [autos, setAutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams(); // undefined en "/"

  useEffect(() => {
    setLoading(true);

    const asyncFunc = categoryId ? getAutosByCategory : getAutos;

    asyncFunc(categoryId)
      .then((res) => {
        setAutos(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]); // useParams en deps como pide la consigna

  if (loading) return <p>Cargando autos...</p>;

  return (
    <section>
      {greeting && <h2>{greeting}</h2>}
      {categoryId && <h3>Categoría: {categoryId.toUpperCase()}</h3>}
      <ItemList autos={autos} />
    </section>
  );
}

function ItemDetailContainer() {
  const [auto, setAuto] = useState(null);
  const [loading, setLoading] = useState(true);
  const { itemId } = useParams();

  useEffect(() => {
    setLoading(true);

    getAutoById(itemId)
      .then((res) => {
        setAuto(res);
      })
      .catch((err) => {
        console.error(err);
        setAuto(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [itemId]);

  if (loading) return <p>Cargando detalle...</p>;
  if (!auto) return <p>Auto no encontrado.</p>;

  return <ItemDetail auto={auto} />;
}

/* =======================
   App con rutas
   ======================= */

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main style={{ padding: "1rem 2rem" }}>
        <Routes>
          {/* Catálogo principal */}
          <Route
            path="/"
            element={
              <ItemListContainer greeting="¡Bienvenid@ a Mundo Auto! Explora nuestras novedades 🚗" />
            }
          />

          {/* Catálogo filtrado por categoría */}
          <Route path="/category/:categoryId" element={<ItemListContainer />} />

          {/* Detalle de auto */}
          <Route path="/item/:itemId" element={<ItemDetailContainer />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
