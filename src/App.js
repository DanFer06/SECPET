import './App.css';
import AddUser from './components/Admin/addUser/addUser';
import Users from './components/Admin/Users/Users';
import PendingReport from './components/Analista/PendingReport/PendingReport';
import SendReport from './components/Lider/SendReport/SendReport';
import Login from './components/Login';
import Plantilla from './components/Plantilla/Plantilla';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      {/* Rutas de las diferentes páginas del proyecto */}
      <Routes>
        <Route path='/' element = {<Login></Login>}></Route>
        <Route path='/inicio' element = {
          <Plantilla></Plantilla>}></Route>
        <Route path='/Users' element = {<Users></Users>}></Route>
        <Route path='/addUser' element = {<AddUser></AddUser>}></Route>
        <Route path='/SendReport' element = {<SendReport></SendReport>}></Route>
        <Route path='/PendingReport' element = {<PendingReport></PendingReport>}></Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;