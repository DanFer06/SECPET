import "./SendReport.css"
import Button from "../../Button/Button";
import Header from "../../Header/Header";
// import api from "../../axiosConfig.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Enviar información de reporte
function SendReport() {
    const [NumOT, actualizarNumOT] = useState("");
    const [FechaCierreOT, actualizarFechaCierreOT] = useState("");
    const navigate = useNavigate();
    const [message, actualizarmessage] = useState("");

    const validarDatos = () => {
        if (NumOT === "") {
            actualizarmessage("Por favor ingrese el número de orden de trabajo");
        } else if (FechaCierreOT === "") {
            actualizarmessage("Por favor ingrese la fecha de cierre de la orden de trabajo");
        }
    }
    return (
        <div>
            <Header volver={"/inicio"}></Header>
            <div className="contenedor">
                <h2>Número de orden de trabajo</h2>
                <input type="text" value={NumOT} onChange={(e) => actualizarNumOT(e.target.value)} />
                <h2>Fecha cierre OT</h2>
                <input type="date" value={FechaCierreOT} onChange={(e) => actualizarFechaCierreOT(e.target.value)} />
            </div>
            <h4 id="mensaje">{message}</h4>
            <button id="boton" onClick={() => validarDatos()}>
                <span>Siguiente</span>
                <img src="/iconos/flecha-pequena-derecha.png" alt="icono"></img>
            </button>
        </div>
    )
}
export default SendReport;