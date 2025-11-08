// Componente contenedor que mostrará el catálogo en próximas entregas
// Recibe un string por props (greeting) y lo muestra

const ItemListContainer = ({ greeting }) => {
  return (
    <main className="container">
      <h1 className="title">{greeting}</h1>
      <p className="subtitle">Muy pronto verás aquí nuestro catálogo de productos.</p>
    </main>
  );
};

export default ItemListContainer;