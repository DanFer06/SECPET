import "./SendReportMaterial.css";
//Componente donde se agrega el material al reporte

function SendReportMaterial() {
    return (
        <div>
        <div className="contenedorMaterial">
            <div className="encabezadoMaterial">
                <h3>Código de material</h3>
                <h3>Cantidad</h3>
            </div>
            <div className="enviarMaterial">
                <input type="text" />
                <input type="text" />
            </div>
        </div>
        <button id="agregarMaterial">
            <img src="iconos/agregar.png" alt="agregar material"></img>
        </button>
        <button id="botonEnviar">
            <span>Enviar</span>
            <img src="/iconos/agregar-documento.png" alt="icono"></img>
        </button>
        </div>
    );
}

export default SendReportMaterial;