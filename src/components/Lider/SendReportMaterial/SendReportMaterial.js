import "./SendReportMaterial.css";
import { useState } from "react";
import api from "../../../axiosConfig";
import { useParams, useNavigate } from 'react-router-dom'; // Importa useParams para obtener el ID de la URL
import Footer from "../../Footer/Footer";

//Componente donde se agrega el material al reporte

function SendReportMaterial() {
    const { idReporte } = useParams();
    const navigate = useNavigate();

    // Estado para almacenar los materiales
    // Inicializamos con un objeto vacío para permitir agregar al menos una fila
    const [materiales, actualizarMaterial] = useState([{ codigoMaterial: "", cantMaterial: "" }]);

    // Función para manejar el cambio en los campos de material
    const cambioMaterial = (index, event) => {
        const { name, value } = event.target;
        const nuevosMateriales = [...materiales]; // Hacemos una copia del estado actual de materiales
        nuevosMateriales[index] = {
            ...nuevosMateriales[index],
            [name]: value
        };
        actualizarMaterial(nuevosMateriales);
    };

    // Función para agregar una nueva fila de material
    const agregarMaterial = () => {
        actualizarMaterial([...materiales, { codigoMaterial: "", cantMaterial: "" }]);
    };

    const enviarMaterial = async () => {
        // Validación de campos vacíos
        // Filtrar materiales que tienen al menos un campo lleno
        const materialParaEnviar = materiales.filter(
            (mat) => mat.codigoMaterial.trim() !== "" || mat.cantMaterial.trim() !== ""
        ).map(materiales => ({ // Mapeamos para enviar solo los campos necesarios
            codigoMaterial: materiales.codigoMaterial.trim(),
            cantMaterial: materiales.cantMaterial.trim()
        })
        );

        // Validar si hay campos llenos a medias
        let camposVacios = false;
        for (const mat of materialParaEnviar) { // Iteramos sobre los que no están completamente vacíos
            const codigoVacio = mat.codigoMaterial.trim() === "";
            const cantidadVacia = mat.cantMaterial.trim() === "";

            // Si hay un código pero no cantidad, o cantidad pero no código, marcamos como camposVacios
            if ((!codigoVacio && cantidadVacia) || (codigoVacio && !cantidadVacia)) {
                camposVacios = true;
                break;
            }
        }


        if (materialParaEnviar.length === 0) {
            // No hay ningún material con al menos un campo lleno
            if (window.confirm("No hay materiales para enviar. ¿Desea continuar sin enviar materiales?")) {
                navigate(`/inicio`);
            }
            return;
        }

        if (camposVacios) {
            // Hay al menos una fila con código pero sin cantidad, o cantidad pero sin código
            window.alert("Debes completar tanto el Código de material como la Cantidad para cada material.");
            return;
        }


        // Confirmación antes de enviar el material
        if (window.confirm(`¿Está seguro de que desea enviar el material del reporte No.${idReporte}?`)) {
            try {
                await api.post(`/Material/${idReporte}`, {
                    materiales: materialParaEnviar.map(material => ({ // Mapeamos para enviar solo los campos necesarios
                        codigoMaterial: material.codigoMaterial,
                        cantMaterial: material.cantMaterial
                    }))
                });
                window.alert("Material enviado correctamente");
                navigate(`/inicio`);
            } catch (error) {
                console.error("Error al enviar el material:", error);
                window.alert("Error al enviar el material. Por favor, intente nuevamente.");
            }
        }
    }

    return (
        <div style={{ marginBottom: "100px" }}>
            <div className="contenedorMaterial">
                <div className="encabezadoMaterial">
                    <h3>Código de material</h3>
                    <h3>Cantidad</h3>
                </div>
                {materiales.map((material, index) => ( // Mapeamos los materiales para crear una fila por cada uno
                    <div className="enviarMaterial" key={index}>
                        <input
                            type="text"
                            name="codigoMaterial"
                            value={material.codigoMaterial}
                            onChange={(event) => cambioMaterial(index, event)}
                        />
                        <input
                            type="number"
                            name="cantMaterial"
                            value={material.cantMaterial}
                            onChange={(event) => cambioMaterial(index, event)}
                        />
                    </div>
                ))}
            </div>
            <button id="agregarMaterial" onClick={agregarMaterial}>
                <img src="/iconos/agregar.png" alt="agregar material"></img>
            </button>

            <button id="botonEnviar" onClick={enviarMaterial}>
                <span>Enviar</span>
                <img src="/iconos/agregar-documento.png" alt="icono"></img>
            </button>
            <Footer></Footer>
        </div>
    );
}

export default SendReportMaterial;