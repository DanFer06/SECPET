import "./Reporte.css"; 
//Visualizar información básica del reporte 

function Reporte () {
    return(
        <div className="reporte"> 
            <div className="id_reporte">
            <p>Reporte número:*******</p>
            <p>Número de OT:******</p>
            </div>
            <img src="img/add.png" alt="Aprobación"></img>
        </div>
    )
}

export default Reporte;