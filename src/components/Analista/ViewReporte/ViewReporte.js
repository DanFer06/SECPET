import "./ViewReporte.css";
//Visualizar toda la información del reporte

function ViewReporte() {
    return (
        <div className="contendor">
            <h3>Reporte número: *******</h3>
            <h3>Número de OT</h3>
            <h3>Fecha de cierre OT: 00/00/0000</h3>
            <div className="material">
                <div className="titulo">
                    <h3>Código de material</h3>
                    <h3>Cantidad</h3>
                </div>
                <div className="reporte">
                    <p>*******</p>
                    <p>50</p>
                </div>
            </div>
            <div class="check">
                <h2>Aprobado</h2>
            </div>
        </div>
            )
}
export default ViewReporte;