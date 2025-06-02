import { useState, useEffect } from "react";
import "./ViewReporte.css";
import api from "../../axiosConfig";
import { useParams, useNavigate } from 'react-router-dom'; // Importa useParams para obtener el ID de la URL
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

//Visualizar toda la información del reporte

function ViewReporte() {
    const [comentario, actualizarComentario] = useState("");
    const { idReporte } = useParams()
    console.log(idReporte)
    const navigate = useNavigate()
    const [reporte, actualizarReporte] = useState({});
    const [usuario, actualizarUsuario] = useState({});
    const [materiales, actualizarMaterial] = useState([]);
    const data = JSON.parse(localStorage.getItem("usuario"));

    useEffect(() => {
        const obtenerReporte = async () => {
            try {
                const response = await api.get(`/reportematerial/${idReporte}`);
                const response2 = await api.get(`/usuarios/${response.data.idUsuario}`);

                actualizarReporte(response.data);
                actualizarUsuario(response2.data);
                console.log(response.data);
                console.log(response2.data);
            } catch (error) {
                console.log(error);
            }
        }
        const obtenerMaterial = async () => {
            try {
                const response3 = await api.get(`/obtenermaterial/${idReporte}`);

                actualizarMaterial(response3.data);
                console.log(response3.data);
            } catch (error) {
                console.log(error);
            }
        }
        obtenerReporte();
        obtenerMaterial();
    }, []);

    const formatearFecha = (fecha) => {
        if (!fecha) return "fecha no disponible";
        const date = new Date(fecha);

        const opciones = { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true
        };

        return new Intl.DateTimeFormat('es-CO', opciones).format(date);
    };

    console.log(reporte)

    let ruta = "/"
    if (reporte.Aprobacion === null) {
        ruta = "/PendingReport"
    } else if (data.idTipoUsuario === 2) {
        ruta = "/VerifiedReports"
    } else {
        ruta = "/ReportsVerified"
    }


    const aprobacion = async (valor) => {
        if (comentario === "") {
            alert("Por favor ingrese un comentario");
            return
        }
        console.log(valor);
        if (window.confirm(`¿Está seguro de ${valor} este reporte?`)) {
            // Si el usuario confirma, se procede a enviar la solicitud de aprobación o rechazo
            await api.patch(`/aprobar/${idReporte}`, { valor, comentario });
            navigate("/PendingReport");
        }
    }

    return (
        <div style={{ marginBottom: "100px" }}>
            <Header volver={ruta}></Header>
            <div className="contendor">
                <h3>Reporte número: {idReporte}</h3>
                <h3>Número de OT: {reporte.NumOT}</h3>
                <h3>Reportado por: {usuario.Nombre} {usuario.Apellido}</h3>
                <h3>Fecha de reporte: {formatearFecha(reporte.FechaReporte)}</h3>
                <h3>Fecha de cierre OT: {formatearFecha(reporte.FechaCierreOT)}</h3>
                <div className="material">
                    <table id="tablaMateriales">
                        <thead>
                            <th>Código de material</th>
                            <th>Cantidad</th>
                        </thead>
                        {materiales.length > 0 ? (
                            //Mostrar en una tabla los materiales
                            <tbody>
                                {materiales.map((material, index) => (
                                    <tr key={index}>
                                        <td>{material.CodigoMaterial}</td>
                                        <td>{material.CantMaterial}</td>
                                    </tr>
                                ))}
                            </tbody>
                        )
                            : (
                                <tr>
                                    <td colSpan="2">No hay materiales registrados para este reporte.</td>
                                </tr>
                            )

                        }

                    </table>

                </div>
                {reporte.Aprobacion === null ? (
                    <div>
                        <h3>Agregar comentario:</h3>
                        <textarea id="comentario" value={comentario} onChange={(e) => actualizarComentario(e.target.value)}></textarea>
                        <div id="aprobacion">
                            <button id="aprobado" onClick={() => aprobacion("Aprobado")}>Aprobar</button>
                            <button id="rechazado" onClick={() => aprobacion("No aprobado")}>Rechazar</button>
                        </div>
                    </div>
                ) : reporte.Aprobacion === "Aprobado" ? (
                    <div>
                        <div>
                            <h3>Comentario del Analista:</h3>
                            <p>{reporte.Comentario}</p>
                        </div>
                        <div className="check" style={{ backgroundColor: "#4bdb51" }}>
                            <h2>{reporte.Aprobacion}</h2>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div>
                            <h3>Comentario del Analista:</h3>
                            <p>{reporte.Comentario}</p>
                        </div>
                        <div className="check" style={{ backgroundColor: "#db4b4b" }}>
                            <h2>{reporte.Aprobacion}</h2>
                        </div>
                    </div>
                )}
            </div>
            <Footer></Footer>
        </div>
    )
}
export default ViewReporte;