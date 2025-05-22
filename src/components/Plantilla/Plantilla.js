import { useEffect, useState } from "react";
import "./Plantilla.css"
import { useParams, useNavigate } from "react-router-dom";
import api from "../../axiosConfig";
import Logo from "../Logo/Logo.js"
import Header from "../Header/Header.js";

// Esta es una plantilla que se utilizará en la página principal para todos los usuarios
//La función recibe el nombre y los botones dependiendo del usuario

function Plantilla() {
    const { idUsuario } = useParams();
    const navigate = useNavigate();
    const [usuario, actualizarUsuario] = useState({});
    const [lista_botones, actualizarBotones] = useState([]);


    useEffect(
        () => {
            const obtenerUsuario = async () => {
                try {
                    const usuarioData = localStorage.getItem("usuario");
                    if (!usuarioData) {
                        navigate("/");
                        return;
                    }
                    else {
                        const data = JSON.parse(usuarioData);
                        actualizarUsuario(data);
                        if (data.idTipoUsuario === 1) {
                            // Es un administrador
                            console.log("Es admin")
                            actualizarBotones([
                                {
                                    imagen: "/Iconos/usuarios.png",
                                    texto: "Usuarios",
                                    ruta: "/Users"
                                },
                            ])
                        } else if (data.idTipoUsuario === 2) {
                            // Es un analista de inventario
                            actualizarBotones([
                                {
                                    imagen: "/img/.png",
                                    texto: "Reportes pendientes"
                                },
                                {
                                    imagen: "/Iconos/documento-firmado.png",
                                    texto: "Reportes verificados"
                                }
                            ])
                        } else if (data.idTipoUsuario === 3) {
                            // Es un lider de cuadrilla
                            actualizarBotones([
                                {
                                    imagen: "/img/.png",
                                    texto: "Reportar material"
                                },
                                {
                                    imagen: "/img/.png",
                                    texto: "Visualizar reportes"
                                }
                            ])
                        }
                    }
                } catch (error) {
                    console.log("El usuario no existe", error);
                    navigate("/");
                }
            };
            obtenerUsuario();


        }, []
    );

    const salir = () => {
        localStorage.removeItem("usuario");
        navigate("/");
    }
    const redirigir = (ruta) => {
        navigate(ruta);
    }

    return (
        <div>
            <Logo></Logo>
            <div class="Botones">
                <div class="Forma">
                    {lista_botones && lista_botones.map((boton) =>
                        <button onClick={() => redirigir(boton.ruta)}>
                            <img src={boton.imagen} alt="Icono"></img>
                            <span>{boton.texto}</span>
                        </button>
                    )}
                </div>
            </div>
            <div class="Salir">
                <button onClick={salir}>Salir</button>
            </div>
        </div>
    );
}

export default Plantilla;