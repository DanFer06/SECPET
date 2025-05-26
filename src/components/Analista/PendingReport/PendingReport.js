import Header from "../../Header/Header";
import { useEffect, useState } from "react";
import api from "../../../axiosConfig";
import Reporte from "../../Reporte/Reporte";

//Visualización de reportes
function PendingReport () {
    const [Reportes, actualizarReporte] = useState([]);
    useEffect(() => {
        const obtenerReportes = async() => {
            try {
                const response = await api.get("/reportematerial");
                console.log(response.data);
                actualizarReporte(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        obtenerReportes();
    }, []);
    return(
        <div>
            <Header text={"Reportes Pendientes"} volver={"/inicio"}></Header>
            {Reportes && Reportes.map((Report) =>
            <Reporte Reporte = {Report}></Reporte>
            )}
        </div>
    )
}
export default PendingReport;