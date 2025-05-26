import Header from "../../Header/Header";
import { useEffect, useState } from "react";
import api from "../../../axiosConfig";
import Reporte from "../../Reporte/Reporte";

function VerifiedReports () {
    const [Reportes, actualizarReporte] = useState([]);

    useEffect(() => {
        const obtenerReportes = async() => {
            try {
                const response = await api.get("/reportematerial");
                const reportesAprobados = response.data.filter(reporte =>
                    reporte.Aprobacion !== null
                );

                actualizarReporte(reportesAprobados);
                console.log(reportesAprobados);
            } catch (error) {
                console.log(error);
            }
        }
        obtenerReportes();
    }, []);
    return(
        <div>
            <Header text={"Visualización de reportes"} volver={"/inicio"}></Header>
            {Reportes && Reportes.map((Report) =>
            <Reporte Reporte={Report}></Reporte>
            )}
        </div>
    )
}

export default VerifiedReports;