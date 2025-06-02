import "./addPassword.css";
import { useState } from "react";

//Formulario para agregar la contraseña
function AddPassword() {
    const [contraseña, actualizarContraseña] = useState('');
    const [confirmContraseña, actualizarConfirm] = useState('');
    const [message, actualizarMessage] = useState('');

    const validarCampos = () => {
        if (contraseña === '') {
            actualizarMessage("Por favor ingrese la contraseña")
        } else if (confirmContraseña === '') {
            actualizarMessage("Por favor la confirmación de la constraseña")
        }
    }


    return (
        <div>
            <div className="formulario">
                <input value={contraseña} type="text" placeholder="Ingrese la contraseña"></input>
                <p>Confirmación</p>
                <input value={confirmContraseña} type="text" placeholder="Ingrese la contraseña nuevamente"></input>
            </div>
            {message && <p className="mensaje" style={{
                color: "red",
                fontSize: "20px",
                textAlign: "center",
                marginTop: "30px"
            }}>{message}</p>}
            <button id="botonAgregarUsuario" onClick={() => { validarCampos() }}>
                <span>Agregar usuario</span>
                <img src="/iconos/agregar-usuario.png" alt="icono"></img>
            </button>
        </div>
    )
}
export default AddPassword;