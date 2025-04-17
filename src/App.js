import './App.css';
import Login from './components/Login';
import Plantilla from './components/Plantilla/Plantilla';

function App() {
  /* Estas listas se utilizarán para los botones de la pagina principal de cada tipo de usuario
  const lista_opciones_analista = [
    {
      imagen: "/img/.png",
      texto: "Reportes pendientes"
    },
    {
      imagen: "/img/.png",
      texto: "Reportes verificados"
    }
  ];
  const lista_opciones_lider = [
    {
      imagen: "/img/.png",
      texto: "Reportar material"
    },
    {
      imagen: "/img/.png",
      texto: "Visualizar reportes"
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
      {/*A continuación se muestra el inicio de sesión "Login"*/}
      <Login></Login>
      
      {/*A continuación son unicamente pruebas de como se utilizará la plantilla en los diferentes usuarios*/}
      {/*Si es analista*/}
      
      {/*<Plantilla 
      nombre="Juan" 
      lista_botones={lista_opciones_analista} 
      ></Plantilla>
        */}
      {/*Si es lider*/}
      
      {/*<Plantilla 
      nombre="Santi" 
      lista_botones={lista_opciones_lider} 
      ></Plantilla>
        */}

      {/*Si es administrador*/}
      
      {/*<Plantilla nombre="Admin" lista_botones={lista_opciones_admin} 
      ></Plantilla>
      */}
    </div>
  );
}

export default App;