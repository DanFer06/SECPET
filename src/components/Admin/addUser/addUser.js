import Header from "../../Header/Header";
import { useState } from "react";
import api from "../../../axiosConfig";
import { useNavigate } from 'react-router-dom'; 
import "./addUser.css";
import Footer from "../../Footer/Footer";

//Formulario para añadir a un nuevo usuario
function AddUser() {
    const navigate = useNavigate();
    const [mostrarContraseña, actualizarMostrarContraseña] = useState(false);
    const [mostrarContraseña2, actualizarMostrarContraseña2] = useState(false);
    const [mostrarSiguiente, actualizarMostrarSiguiente] = useState(false);
    const [usuarioForm, actualizarUsuarioForm] = useState({});
    const [tipoUsuario, actualizarTipoUsuario] = useState('');
    const [nombre, actualizarNombre] = useState('');
    const [apellido, actualizarApellido] = useState('');
    const [cedula, actualizarCedula] = useState('');
    const [email, actualizarEmail] = useState('');
    const [numeroCuadrilla, actualizarNumeroCuadrilla] = useState('');
    const [numeroBodega, actualizarNumeroBodega] = useState('');
    const [mensajeError, actualizarMensajeError] = useState('');
    const [contraseña, actualizarContraseña] = useState('');
    const [confirmContraseña, actualizarConfirm] = useState('');
    const [message, actualizarMessage] = useState('');

    // Función para eliminar el valor agregado al campo Numero de cuadrilla o bodega en caso de un cambio en el tipo de usuario
    const cambioTipoUsuario = (e) => {
        const valor = e.target.value;
        actualizarTipoUsuario(valor);
        if (valor !== '2') {
            actualizarNumeroBodega(0);
        } else if (valor !== '3') {
            actualizarNumeroCuadrilla(0);
        }
    }

    // Función para alternar la visibilidad de la contraseña
    const alternarVisibilidadContraseña = (numero) => {
        if (numero === "1") {
            actualizarMostrarContraseña(!mostrarContraseña);
        } else if (numero === "2") {
            actualizarMostrarContraseña2(!mostrarContraseña2);
        }
    };

    // Función para validar los campos del formulario antes de continuar
    const validarCampos = () => {
        if (!tipoUsuario || !nombre || !apellido || !cedula || !email) {
            actualizarMensajeError("Por favor, complete todos los campos.");
            return false;
        }
        if (tipoUsuario === "2" && !numeroBodega) {
            actualizarMensajeError("Por favor, ingrese el número de bodega.");
            return false;
        }
        if (tipoUsuario === "3" && !numeroCuadrilla) {
            actualizarMensajeError("Por favor, ingrese el número de cuadrilla.");
            return false;
        }

        if (window.confirm("¿Desea seguir con la creación del usuario?")) {
            // Actualizar los datos del usuario
            actualizarUsuarioForm({
                tipoUsuario,
                nombre,
                apellido,
                cedula,
                email,
                numeroCuadrilla: tipoUsuario === "3" || tipoUsuario === 3 ? numeroCuadrilla : 0, // Asignar 0 si no es Lider
                numeroBodega: tipoUsuario === "2" || tipoUsuario === 2 ? numeroBodega : 0 // Asignar 0 si no es Analista de inventario
            });

            actualizarMostrarSiguiente(true);
            actualizarMensajeError('');
        }
        return true;
    }

    // Función para validar la contraseña y confirmar si se desea agregar el usuario
    const validarContraseña = async () => {
        if (contraseña === '') {
            actualizarMessage("Por favor ingrese la contraseña")
        } else if (confirmContraseña === '') {
            actualizarMessage("Por favor ingrese la confirmación de la contraseña")
        } else if (contraseña !== confirmContraseña) {
            actualizarMessage("Las contraseñas no coinciden");
        } else if (window.confirm("¿Está seguro de que desea agregar el usuario?")) {
            // Agregar la contraseña al objeto usuarioForm
            usuarioForm.contraseña = contraseña;
            console.log("Usuario con contraseña:", usuarioForm);

            try {
                await api.post("/crearusuarios", {
                    idTipoUsuario: usuarioForm.tipoUsuario,
                    Nombre: usuarioForm.nombre,
                    Apellido: usuarioForm.apellido,
                    Cedula: usuarioForm.cedula,
                    Email: usuarioForm.email,
                    NumCuadrilla: usuarioForm.numeroCuadrilla,
                    idBodega: usuarioForm.numeroBodega,
                    Password: usuarioForm.contraseña
                });
                navigate("/Users");
            } catch (error) {
                window.alert("Error al agregar el usuario. Por favor, inténtelo de nuevo.");
                console.error("Error al agregar usuario:", error);
            }
        }
    }

    return (
        <div style={{ marginBottom: "100px" }}>
            <Header text={"Crear nuevo usuario"} volver={"/Users"}></Header>
            
            {!mostrarSiguiente ? ( // Mostrar el formulario inicial para ingresar los datos del usuario
                <div>
                    <div className="formulario">
                        <select name="Tipo de usuario" id="usuarios" value={tipoUsuario} onChange={cambioTipoUsuario}>
                            <option value="">Tipo de usuario</option>
                            <option value="1">Administrador</option>
                            <option value="2">Analista de inventario</option>
                            <option value="3">Lider de cuadrilla</option>
                        </select>
                        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => actualizarNombre(e.target.value)}></input>
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
                    {mensajeError && <p className="error" style={
                        {
                            color: "red",
                            fontSize: "20px",
                            textAlign: "center",
                            marginTop: "30px"
                        }
                    }>{mensajeError}</p>}
                    <button id="boton" onClick={() => { validarCampos() }}>
                        <span>Siguiente</span>
                        <img src="/iconos/flecha-pequena-derecha.png" alt="icono"></img>
                    </button>
                </div>
            ) : ( // Mostrar el formulario para ingresar la contraseña y confirmación
                <div>
                    <div className="formulario2">
                        <div className="contenedorContraseña">
                            <input value={contraseña} type={mostrarContraseña ? "text" : "password"} placeholder="Ingrese la contraseña" onChange={(e) => actualizarContraseña(e.target.value)}></input>
                            <span className="toggle-password"
                                onClick={() => alternarVisibilidadContraseña("1")}> 
                                <img
                                    src={mostrarContraseña ? "/iconos/ojos-cruzados.png" : "/iconos/ojo.png"}
                                    alt={mostrarContraseña ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                                />
                            </span>
                        </div>
                        <p>Confirmación</p>
                        <div className="contenedorContraseña">
                            <input value={confirmContraseña} type={mostrarContraseña2 ? "text" : "password"} placeholder="Ingrese la contraseña nuevamente" onChange={(e) => actualizarConfirm(e.target.value)}></input>
                            <span className="toggle-password"
                                onClick={() => alternarVisibilidadContraseña("2")}>
                                <img
                                    src={mostrarContraseña2 ? "/iconos/ojos-cruzados.png" : "/iconos/ojo.png"}
                                    alt={mostrarContraseña2 ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                                />
                            </span>
                        </div>
                    </div>
                    {message && <p className="mensaje" style={{
                        color: "red",
                        fontSize: "20px",
                        textAlign: "center",
                        marginTop: "30px"
                    }}>{message}</p>}
                    <button id="botonAgregarUsuario" onClick={() => { validarContraseña() }}>
                        <span>Agregar usuario</span>
                        <img src="/iconos/agregar-usuario.png" alt="icono"></img>
                    </button>
                </div>
            )}
            <Footer></Footer>
        </div>
    );
}

export default AddUser;