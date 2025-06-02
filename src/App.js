import './App.css';
import AddUser from './components/Admin/addUser/addUser';
import Users from './components/Admin/Users/Users';
import PendingReport from './components/Analista/PendingReport/PendingReport';
import VerifiedReports from './components/Analista/VerfiedReports/VerifiedReports';
import ReportsVerified from './components/Lider/ReportsVerified/ReportsVerified';
import SendReport from './components/Lider/SendReport/SendReport';
import Login from './components/Login';
import Plantilla from './components/Plantilla/Plantilla';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ViewReporte from './components/ViewReporte/ViewReporte';
import SendReportMaterial from './components/Lider/SendReportMaterial/SendReportMaterial';
import ModifyUser from './components/Admin/modifyUser/modifyUser';
import UserInfo from './components/Admin/userInfo/userInfo';

function App() {
  return (
    <Router>
    <div className="App">
      {/* Rutas de las diferentes páginas del proyecto */}
      <Routes>
        <Route path='/' element = {<Login></Login>}></Route>
        <Route path='/inicio' element = {<Plantilla></Plantilla>}></Route>
        <Route path='/Users' element = {<Users></Users>}></Route>
        <Route path='/addUser' element = {<AddUser></AddUser>}></Route>
        <Route path='/SendReport' element = {<SendReport></SendReport>}></Route>
        <Route path='/PendingReport' element = {<PendingReport></PendingReport>}></Route>
        <Route path='/VerifiedReports' element = {<VerifiedReports></VerifiedReports>}></Route>
        <Route path='/ViewReporte/:idReporte' element = {<ViewReporte></ViewReporte>}></Route>
        <Route path='/ReportsVerified' element={<ReportsVerified></ReportsVerified>}></Route>
        <Route path="/SendReportMaterial/:idReporte" element={<SendReportMaterial></SendReportMaterial>}></Route>
        <Route path='/modifyUser/:idUsuario' element = {<ModifyUser></ModifyUser>}></Route>
        <Route path='/userInfo/:idUsuario' element = {<UserInfo></UserInfo>}></Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;