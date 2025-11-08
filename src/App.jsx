import NavBar from "./components/NavBar.jsx";
import ItemListContainer from "./components/ItemListContainer.jsx";

function App() {
  return (
    <>
      <NavBar />
      {/* Enviamos la prop `greeting` como string a ItemListContainer */}
      <ItemListContainer greeting="¡Bienvenid@ a Tienda Quinteros! Explora nuestras novedades 👋" />
    </>
  );
}

export default App;