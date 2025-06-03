import Header from "../../Header/Header";
import { useEffect, useState } from "react";
import api from "../../../axiosConfig";
import Reporte from "../../Reporte/Reporte";
import Footer from "../../Footer/Footer";

//Visualización de reportes
function PendingReport () {
    const [Reportes, actualizarReporte] = useState([]);

    useEffect(() => {
        // Función para obtener todos reportes
        const obtenerReportes = async() => {
            try {
                const response = await api.get("/reportematerial");
                // Filtrar los reportes que no han sido aprobados
                const reportesPendientes = response.data.filter(reporte =>
                    reporte.Aprobacion === null // Donde Aprobacion es null
                );

                actualizarReporte(reportesPendientes);
            } catch (error) {
                console.log(error);
            }
        }
        obtenerReportes();
    }, []);
    return(
        <div style={{ marginBottom: "100px" }}>
            <Header text={"Reportes Pendientes"} volver={"/inicio"}></Header>
            {Reportes && Reportes.length > 0 ? (
                Reportes.map((Report) =>
                    <Reporte Reporte={Report} key={Report.id}></Reporte>
                )
            ) : ( // Si no hay reportes pendientes
                <h2 style={{ textAlign: "center", marginTop: "70px" }}>No se encontraron reportes para mostrar.</h2>
            )}
            <Footer></Footer>
        </div>
    )
}
export default PendingReport;