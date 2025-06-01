import Header from "../../Header/Header";
import { useState } from "react";
import "./addUser.css";
//Formulario para añadir a un nuevo usuario
function AddUser() {
    const [tipoUsuario, actualizarTipoUsuario] = useState('');
    const [nombre, actualizarBotonesNombre] = useState('');
    const [apellido, actualizarApellido] = useState('');
    const [cedula, actualizarCedula] = useState('');
    const [email, actualizarEmail] = useState('');
    const [numeroCuadrilla, actualizarNumeroCuadrilla] = useState('');
    const [numeroBodega, actualizarNumeroBodega] = useState('');

    const cambioTipoUsuario = (e) => {
        const valor = e.target.value;
        actualizarTipoUsuario(valor);
        if (valor !== '2') {
            actualizarNumeroBodega('');
        } else if (valor !== '3') {
            actualizarNumeroCuadrilla('');
        }
    }

    return (
        <div>
            <Header text={"Crear nuevo usuario"} volver={"/Users"}></Header>
            <div className="formulario">
                <select name="Tipo de usuario" id="usuarios" value={tipoUsuario} onChange={cambioTipoUsuario}>
                    <option value="">Tipo de usuario</option>
                    <option value="1">Administrador</option>
                    <option value="2">Analista de inventario</option>
                    <option value="3">Lider de cuadrilla</option>
                </select>
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => actualizarBotonesNombre(e.target.value)}></input>
                <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => actualizarApellido(e.target.value)}></input>
                <input type="text" placeholder="No. cédula de ciudadanía" value={cedula} onChange={(e) => actualizarCedula(e.target.value)}></input>
                <input type="text" placeholder="Email" value={email} onChange={(e) => actualizarEmail(e.target.value)}></input>
                {tipoUsuario === "2" && (
                    <input type="text" placeholder="Número de bodega" value={numeroBodega} onChange={(e) => actualizarNumeroBodega(e.target.value)}></input>
                )}
                {tipoUsuario === "3" && (
                    <input type="text" placeholder="Número de cuadrilla" value={numeroCuadrilla} onChange={(e) => actualizarNumeroCuadrilla(e.target.value)}></input>
                )}
            </div>
            <button id="boton">
                <span>Siguiente</span>
                <img src="/iconos/flecha-pequena-derecha.png" alt="icono"></img>
            </button>
        </div>
    );
}

export default AddUser;