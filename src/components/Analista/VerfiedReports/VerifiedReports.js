import Header from "../../Header/Header";
import { useEffect, useState } from "react";
import api from "../../../axiosConfig";
import Reporte from "../../Reporte/Reporte";
import Footer from "../../Footer/Footer";

// Visualización de reportes validados
function VerifiedReports () {
    const [Reportes, actualizarReporte] = useState([]);

    useEffect(() => {
        // Función para obtener todos los reportes
        const obtenerReportes = async() => {
            try {
                const response = await api.get("/reportematerial");
                // Filtrar los reportes que han sido aprobados
                const reportesAprobados = response.data.filter(reporte =>
                    reporte.Aprobacion !== null // Donde Aprobacion no es null
                );

                // Ordenar los reportes por fecha de reporte en orden descendente
                const reportesOrdenados = reportesAprobados.sort((a, b) => {
                    const fechaA = new Date(a.FechaReporte);
                    const fechaB = new Date(b.FechaReporte);
                    return fechaB - fechaA; // Orden descendente
                });

                actualizarReporte(reportesOrdenados);
            } catch (error) {
                console.log(error);
            }
        }
        obtenerReportes();
    }, []);

    return(
        <div style={{ marginBottom: "100px" }}>
            <Header text={"Visualización de reportes"} volver={"/inicio"}></Header>
            {Reportes && Reportes.map((Report) => // Mapeo de los reportes aprobados
            <Reporte Reporte={Report} key={Report.idReporte}></Reporte>
            )}
            <Footer></Footer>
        </div>
    )
}

export default VerifiedReports;