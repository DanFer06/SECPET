import Footer from "../Footer/Footer";
import Logo from "../Logo/Logo";
import "./Login.css";
import api from "../../axiosConfig.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//Pagina de inicio de sesión

function Login() {
    const [Cedula, ActualizarCedula] = useState("");
    const [Password, ActualizarPassword] = useState("");
    const [TipoUsuario, ActualizarTipoUsuario] = useState("");
    const [mensaje, Actualizarmensaje] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const usuarioData = localStorage.getItem("usuario");

        if (usuarioData) {
            navigate("/inicio");
        }
    }, [navigate]);

    const validarDatos = () => {
        if (Cedula === "") {
            Actualizarmensaje("Por favor ingrese su usuario")
        }
        else if (Password === "") {
            Actualizarmensaje("Por favor ingrese su contraseña")
        }
        else if (TipoUsuario === "") {
            Actualizarmensaje("Por favor seleccione un tipo de usuario")
        }
        else {
            api.get(`/usuario/${Cedula}`)
            .then(response => {
                if (response.data) {
                    // Verificar el tipo de usuario
                    if (Number(response.data.idTipoUsuario) !== Number(TipoUsuario)) {
                        Actualizarmensaje("El tipo de usuario es incorrecto")
                    }
                    // Verificar la contraseña
                    else if (response.data.Password === Password) {
                        // Guardar el usuario en localStorage
                        localStorage.setItem("usuario", JSON.stringify(response.data));
                        navigate(`/inicio`)
                    }else {
                        Actualizarmensaje("La contraseña es incorrecta")
                    }
                }
            })
            .catch(error => { 
                console.error("Error: ", error)
                if (error.response && error.response.status === 404) {
                    Actualizarmensaje("El usuario no existe")
                } else {
                    Actualizarmensaje("Error al conectar con el servidor")
                }
            }) 
        }
    };
    
    return (
        <div>
            <Logo></Logo>
            <main>
                <section>
                    <h2 className="bienvenido">Bienvenido</h2>
                    <p>Por favor inicie sesión</p>
                </section>
                <div className="login-page">
                    <div className="form">
                        <div className="login-form">
                            <select name="Tipo de usuario" id="Usuario" value={TipoUsuario} 
                            onChange={(e) => ActualizarTipoUsuario(e.target.value)}>
                                <option value="">Tipo de usuario</option>
                                <option value="1">Administrador</option>
                                <option value="2">Analista de inventario</option>
                                <option value="3">Lider de cuadrilla</option>
                            </select>
                            <input id="usuario" type="text" placeholder="Usuario" value={Cedula} 
                            onChange={(e) => ActualizarCedula(e.target.value)}/>
                            <input id="contraseña" type="password" placeholder="Contraseña" value={Password} 
                            onChange={(e) => ActualizarPassword(e.target.value)}/>
                            <p style={{ color: "red" }}>{mensaje}</p>
                            <button id="ingresar" onClick={validarDatos}>Ingresar</button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
}
export default Login