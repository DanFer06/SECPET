import "./SendReport.css"
import Header from "../../Header/Header";
import api from "../../../axiosConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../Footer/Footer";

//Enviar información de reporte
function SendReport() {
    const [NumOT, actualizarNumOT] = useState("");
    const [FechaCierreOT, actualizarFechaCierreOT] = useState("");
    const navigate = useNavigate();
    const [message, actualizarmessage] = useState("");

    // Función para validar los datos ingresados
    const validarDatos = async () => {
        if (NumOT === "") {
            actualizarmessage("Por favor ingrese el número de orden de trabajo");
        } else if (FechaCierreOT === "") {
            actualizarmessage("Por favor ingrese la fecha de cierre de la orden de trabajo");
        } 
        
        // Obtener la fecha y hora actual
        const fecha = new Date(); 
        // Formatear la fecha y hora actual
        const horas = fecha.getHours().toString().padStart(2, '0');
        const minutos = fecha.getMinutes().toString().padStart(2, '0');
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
        const anio = fecha.getFullYear();

        const horaActual = (`${anio}-${mes}-${dia} ${horas}:${minutos}`); // Formato: YYYY-MM-DD HH:mm
        
        // confirmación para enviar el reporte
        if (window.confirm("¿Está seguro de que desea enviar el reporte?")) {
            const response = await api.post("/enviarreporte", {
                NumOT: NumOT,
                FechaReporte: horaActual,
                idUsuario: JSON.parse(localStorage.getItem("usuario")).idUsuario,
                FechaCierreOT: FechaCierreOT
            });

            // Manejo de la respuesta del servidor
            if (response.status === 201) { // Si el reporte se creó correctamente
                const { message, insertId } = response.data;
                const reporteCreadoId = insertId; // Obtenemos el ID del reporte creado
                console.log(message, reporteCreadoId);

                navigate(`/SendReportMaterial/${reporteCreadoId}`);
            }
        }
    }
    return (
        <div style={{ marginBottom: "100px" }}>
            <Header volver={"/inicio"}></Header>
            <div className="contenedor">
                <h2>Número de orden de trabajo</h2>
                <input type="text" value={NumOT} onChange={(e) => actualizarNumOT(e.target.value)} />
                <h2>Fecha cierre OT</h2>
                <input type="date" value={FechaCierreOT} onChange={(e) => actualizarFechaCierreOT(e.target.value)} />
            </div>
            <h4 id="mensaje">{message}</h4>
            <button id="botonSiguiente" onClick={() => { validarDatos(); }}>
                <span>Siguiente</span>
                <img src="/iconos/flecha-pequena-derecha.png" alt="icono"></img>
            </button>
            <Footer></Footer>
        </div>
    )
}

export default SendReport;