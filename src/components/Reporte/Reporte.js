import { useNavigate } from "react-router-dom";
import "./Reporte.css"; 

//Visualizar información básica del reporte 

function Reporte ({Reporte}) {
    let URL = "/null";
    const navigate = useNavigate();
    const idReporte=Reporte.idReporte

    // Función para redirigir al usuario a la página de visualización del reporte
    const Redirect = () => {
        navigate(`/ViewReporte/${idReporte}`)
    }
    
    // Determinar la URL del icono según el estado de aprobación del reporte
    if (Reporte.Aprobacion === "Aprobado") {
        URL = "/Iconos/controlar.png";
    } else {
        URL = "/Iconos/cruz.png"
    }
    
    return(
            <div className="reporte" onClick={Redirect}> 
            <div className="id_reporte">
            <p>Reporte número:  {Reporte.idReporte}</p>
            <p>Número de OT:  {Reporte.NumOT}</p>
            </div>
            {Reporte.Aprobacion &&
            <img src={URL} alt="Aprobación"></img>
            }
        </div>);
}
export default Reporte;