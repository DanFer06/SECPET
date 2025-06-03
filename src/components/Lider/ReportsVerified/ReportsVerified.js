import Header from "../../Header/Header";
import { useEffect, useState } from "react";
import api from "../../../axiosConfig";
import Reporte from "../../Reporte/Reporte";
import Footer from "../../Footer/Footer";

// Visualización de reportes verificados 
function VerifiedReports () {
    const [Reportes, actualizarReporte] = useState([]);
    const usuario = localStorage.getItem("usuario"); // Obtener el usuario del localStorage
    const usuarioData = JSON.parse(usuario); // Parsear el usuario a un objeto JSON
    const idUsuario = usuarioData.idUsuario; // Obtener el id del usuario

    // Efecto para obtener los reportes del usuario
    useEffect(() => {
        const obtenerReportes = async() => {
            try {
                const response = await api.get(`/reportematerial/usuario/${idUsuario}`);
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
    }, [idUsuario]); // Se ejecuta cuando el componente se monta o cuando cambia el idUsuario
    return(
        <div style={{ marginBottom: "100px" }}>
            <Header text={"Visualización de reportes"} volver={"/inicio"}></Header>
            {Reportes && Reportes.map((Report) =>
            <Reporte Reporte={Report}></Reporte>
            )}
            <Footer></Footer>
        </div>
    )
}

export default VerifiedReports;