import "./SendReport.css"
import Button from "../../Button/Button";
import Header from "../../Header/Header";
//Enviar información de reporte
function SendReport() {
    return (
        <div>
            <Header volver={"/inicio"}></Header>
            <div class="contenedor">
                <h2>Número de orden de trabajo</h2>
                <input type="text" />
                <h2>Fecha cierre OT</h2>
                <input type="date" />
            </div>
            <Button></Button>
        </div>
    )
}
export default SendReport;