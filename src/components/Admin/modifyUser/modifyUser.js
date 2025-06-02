import "./modifyUser.css";
import { useState, useEffect } from "react";
import Header from "../../Header/Header";
import api from "../../../axiosConfig";
import { useNavigate, useParams } from 'react-router-dom'; 
import Footer from "../../Footer/Footer";

function ModifyUser() {
    const navigate = useNavigate();
    const { idUsuario } = useParams();
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

    useEffect(() => {
        // Cargar los datos del usuario al iniciar el componente
        const cargarDatosUsuario = async () => {
            try {
                const response = await api.get(`/usuarios/${idUsuario}`);
                const data = response.data;
                actualizarUsuarioForm(data);
                actualizarTipoUsuario(data.idTipoUsuario);
                actualizarNombre(data.Nombre);
                actualizarApellido(data.Apellido);
                actualizarCedula(data.Cedula);
                actualizarEmail(data.Email);
                actualizarNumeroCuadrilla(data.NumCuadrilla);
                actualizarNumeroBodega(data.idBodega);
            } catch (error) {
                console.error("Error al cargar los datos del usuario:", error);
            }
        };
        cargarDatosUsuario();
    }, [idUsuario]);

    const alternarVisibilidadContraseña = (numero) => {
        if (numero === "1") {
            actualizarMostrarContraseña(!mostrarContraseña);
        } else if (numero === "2") {
            actualizarMostrarContraseña2(!mostrarContraseña2);
        }
    };

    const cambioTipoUsuario = (e) => {
        const valor = e.target.value;
        actualizarTipoUsuario(valor);
        if (valor !== '2') {
            actualizarNumeroBodega(numeroBodega);
        } else if (valor !== '3') {
            actualizarNumeroCuadrilla(numeroCuadrilla);
        }
    }

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

        if (window.confirm("¿Desea seguir con la modificación del usuario?")) {
            // Actualizar los datos del usuario
            actualizarUsuarioForm({
                tipoUsuario,
                nombre,
                apellido,
                cedula,
                email,
                numeroCuadrilla: tipoUsuario === "3" ? numeroCuadrilla : 0,
                numeroBodega: tipoUsuario === "2" ? numeroBodega : 0
            });

            actualizarMostrarSiguiente(true);
            actualizarMensajeError('');
        }
        return true;
    }

    const validarContraseña = async () => {
        if (contraseña === '') {
            actualizarMessage("Por favor ingrese la contraseña")
        } else if (confirmContraseña === '') {
            actualizarMessage("Por favor la confirmación de la constraseña")
        }
        else if (contraseña !== confirmContraseña) {
            actualizarMessage("Las contraseñas no coinciden");
        } else if (window.confirm("¿Está seguro de que desea modificar el usuario?")) {
            // Agregar la contraseña al objeto usuarioForm
            usuarioForm.contraseña = contraseña;
            console.log("Usuario con contraseña:", usuarioForm);

            try {
                await api.put(`/actualizarusuarios/${idUsuario}`, {
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
                window.alert("Error al modificar el usuario. Por favor, inténtelo de nuevo.");
                console.error("Error al modificar usuario:", error);
            }
        }
    }


    return(
        <div style={{ marginBottom: "100px" }}>
                <Header text={"Modificar usuario"} volver={"/Users"}></Header>
                {!mostrarSiguiente ? (
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
                            {(tipoUsuario === "2" || tipoUsuario === 2) && (
                                <input type="text" placeholder="Número de bodega" value={numeroBodega} onChange={(e) => actualizarNumeroBodega(e.target.value)}></input>
                            )}
                            {(tipoUsuario === "3" || tipoUsuario === 3) && (
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
                ) : (
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
                            <span>Modificar usuario</span>
                            <img src="/iconos/controlar.png" alt="icono"></img>
                        </button>
                    </div>
                )}
                <Footer></Footer>
            </div>
    )
}

export default ModifyUser;