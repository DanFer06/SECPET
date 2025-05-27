import { useEffect, useState } from "react";
import "./Plantilla.css"
import { useParams, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo.js"
import Footer from "../Footer/Footer.js";

// Esta es una plantilla que se utilizará en la página principal para todos los usuarios
//La función recibe el nombre y los botones dependiendo del usuario

function Plantilla() {
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
                                    imagen: "/Iconos/duplicar.png",
                                    texto: "Reportes pendientes",
                                    ruta: "/PendingReport"
                                },
                                {
                                    imagen: "/Iconos/documento-firmado.png",
                                    texto: "Reportes verificados",
                                    ruta: "/VerifiedReports"
                                }
                            ])
                        } else if (data.idTipoUsuario === 3) {
                            // Es un lider de cuadrilla
                            actualizarBotones([
                                {
                                    imagen: "/Iconos/agregar-documento.png",
                                    texto: "Reportar material",
                                    ruta: "/SendReport"
                                },
                                {
                                    imagen: "Iconos/duplicar.png",
                                    texto: "Visualizar reportes",
                                    ruta: "/ReportsVerified"
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
            <Footer></Footer>
        </div>
    );
}

export default Plantilla;