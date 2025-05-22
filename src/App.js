import './App.css';
import AddUser from './components/Admin/addUser/addUser';
import Users from './components/Admin/Users/Users';
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
        <Route path='/inicio' element = {
          <Plantilla></Plantilla>}></Route>
        <Route path='/Users' element = {<Users></Users>}></Route>
        <Route path='/addUser' element = {<AddUser></AddUser>}></Route>
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