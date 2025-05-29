import Header from "../../Header/Header";
import { useEffect, useState } from "react";
import api from "../../../axiosConfig";
import Reporte from "../../Reporte/Reporte";

function VerifiedReports () {
    const [Reportes, actualizarReporte] = useState([]);
    const usuario = localStorage.getItem("usuario");
    const usuarioData = JSON.parse(usuario);
    const idUsuario = usuarioData.idUsuario;
    useEffect(() => {
        const obtenerReportes = async() => {
            try {
                const response = await api.get(`/reportematerial/usuario/${idUsuario}`);
                const reportesAprobados = response.data.filter(reporte =>
                    reporte.Aprobacion !== null
                );

                const reportesOrdenados = reportesAprobados.sort((a, b) => {
                    const fechaA = new Date(a.FechaReporte);
                    const fechaB = new Date(b.FechaReporte);
                    return fechaB - fechaA; // Orden descendente
                });

                actualizarReporte(reportesOrdenados);
                console.log(reportesOrdenados);
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