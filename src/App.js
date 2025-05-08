import './App.css';
import Login from './components/Login';
import Plantilla from './components/Plantilla/Plantilla';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      {/*A continuación se muestra el inicio de sesión "Login"*/}
      <Routes>
        <Route path='/' element = {<Login></Login>}></Route>
        <Route path='/inicio/:idUsuario' element = {
          <Plantilla></Plantilla>}></Route>
      </Routes>
      
      {/*A continuación son unicamente pruebas de como se utilizará la plantilla en los diferentes usuarios*/}
      {/*Si es analista*/}
      
      
      
      {/*Si es lider*/}
{/*       
      <Plantilla 
      nombre="Santi" 
      lista_botones={lista_opciones_lider} 
      ></Plantilla>
         */}

      {/*Si es administrador*/}
{/*       
      <Plantilla nombre="Admin" 
      lista_botones={lista_opciones_admin} 
      ></Plantilla>
       */}
    </div>
    </Router>
  );
}

export default App;