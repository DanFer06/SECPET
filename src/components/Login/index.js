//importamos el pie de página y el logo

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
    const [Resultado, actualizarResultado] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const usuarioData = localStorage.getItem("usuario");

        if (usuarioData) {
            const usuario = JSON.parse(usuarioData);
            navigate("/inicio");
        }
    }, []);

    const validarDatos = () => {
        console.log("Cedula:", Cedula, "Password:", Password, "Tipo de usuario:", TipoUsuario); 
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
                console.log(response)
                actualizarResultado(response.data);
                console.log(response.data);
                if (response.data) {
                    console.log("hay dato");
                    if (Number(response.data.idTipoUsuario) !== Number(TipoUsuario)) {
                        Actualizarmensaje("El tipo de usuario es incorrecto")
                    }
                    else if (response.data.Password === Password) {
                        localStorage.setItem("usuario", JSON.stringify(response.data));
                        navigate(`/inicio`)
                    }else {
                        Actualizarmensaje("La contraseña es incorrecta")
                    }
                }
            })
            .catch(error => { 
                console.error("Error: ", error)
                Actualizarmensaje("El usuario no existe")
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
                <div class="login-page">
                    <div class="form">
                        <div class="login-form">
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
                            <p>{mensaje}</p>
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