import "./addPassword.css";
//Formulario para agregar la contraseña
function addPassword() {
    return (
        <div className="formulario">
            <input type="text" placeholder="Ingrese la contraseña"></input>
            <p>Confirmación</p>
            <input type="text" placeholder="Ingrese la contraseña nuevamente"></input>
        </div>
        )
}
export default addPassword;