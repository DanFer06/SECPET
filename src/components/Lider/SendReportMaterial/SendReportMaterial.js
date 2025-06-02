import "./SendReportMaterial.css";
import { useState, useEffect } from "react";
import api from "../../../axiosConfig";
import { useParams, useNavigate } from 'react-router-dom'; // Importa useParams para obtener el ID de la URL

//Componente donde se agrega el material al reporte

function SendReportMaterial() {
    const { idReporte } = useParams();
    const navigate = useNavigate();

    const [materiales, actualizarMaterial] = useState([{ codigoMaterial: "", cantMaterial: "" }]);

    const cambioMaterial = (index, event) => {
        const { name, value } = event.target;
        const nuevosMateriales = [...materiales];
        nuevosMateriales[index] = {
            ...nuevosMateriales[index],
            [name]: value
        };
        actualizarMaterial(nuevosMateriales);
    };

    const agregarMaterial = () => {
        actualizarMaterial([...materiales, { codigoMaterial: "", cantMaterial: "" }]);
    };

    const enviarMaterial = async () => {
        // Validación de campos vacíos
        const materialParaEnviar = materiales.filter(
            (mat) => mat.codigoMaterial.trim() !== "" || mat.cantMaterial.trim() !== ""
        ).map(materiales => ({
            codigoMaterial: materiales.codigoMaterial.trim(),
            cantMaterial: materiales.cantMaterial.trim()
        })
        );

        console.log("Materiales a enviar:", materialParaEnviar);

        // 2. Validar si hay campos llenos a medias
        let camposVacios = false;
        for (const mat of materialParaEnviar) { // Iteramos sobre los que no están completamente vacíos
            const codigoVacio = mat.codigoMaterial.trim() === "";
            const cantidadVacia = mat.cantMaterial.trim() === "";

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


        if (window.confirm(`¿Está seguro de que desea enviar el material del reporte No.${idReporte}?`)) {
            try {
                await api.post(`/Material/${idReporte}`, {
                    materiales: materialParaEnviar.map(material => ({
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
        <div>
            <div className="contenedorMaterial">
                <div className="encabezadoMaterial">
                    <h3>Código de material</h3>
                    <h3>Cantidad</h3>
                </div>
                {materiales.map((material, index) => (
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
        </div>
    );
}

export default SendReportMaterial;