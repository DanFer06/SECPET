import "./Reporte.css"; 
//Visualizar información básica del reporte 

function Reporte ({Reporte}) {
    return(
        <div className="reporte"> 
            <div className="id_reporte">
            <p>Reporte número:{Reporte.idReporte}</p>
            <p>Número de OT:{Reporte.NumOT}</p>
            </div>
            <img src="img/add.png" alt="Aprobación"></img>
        </div>);
}
export default Reporte;