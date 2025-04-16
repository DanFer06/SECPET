import './App.css';
import Login from './components/Login';
import Plantilla from './components/Plantilla/Plantilla';

function App() {
  /*
  const lista_opciones_analista = [
    {
      imagen: "/img/.png",
      texto: "Reportes pendientes"
    },
    {
      imagen: "",
      texto: "Reportes verificados"
    }
  ];
  const lista_opciones_admin = [
    {
      imagen: "/img/.png",
      texto: "Usuarios"
    },
    
  ];
*/
  return (
    <div className="App">
      <Login></Login>
      {/* Si es analista  */}
      {/*<Plantilla 
      nombre="Juan" 
      lista_botones={lista_opciones_analista} 
      ></Plantilla>*/}
      {/* Si es administrador  */}{/*
      <Plantilla nombre="Admin" lista_botones={lista_opciones_admin} ></Plantilla>*/}
    </div>
  );
}

export default App;