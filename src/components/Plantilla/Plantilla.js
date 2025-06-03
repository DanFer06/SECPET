import { useEffect, useState } from "react";
import "./Plantilla.css"
import { useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo.js"
import Footer from "../Footer/Footer.js";

// Esta es una plantilla que se utilizará en la página principal para todos los usuarios
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
                        navigate("/"); // Si no hay usuario en localStorage, redirigir a la página de inicio
                        return;
                    }
                    else {
                        const data = JSON.parse(usuarioData);
                        actualizarUsuario(data);
                        // Actualizar los botones según el tipo de usuario
                        if (data.idTipoUsuario === 1) {
                            // Es un administrador
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
                                    imagen: "/Iconos/duplicar.png",
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

    // Función para cerrar sesión
    const salir = () => {
        if (window.confirm("¿Estás seguro de que deseas cerrar sesión?")) {
            localStorage.removeItem("usuario");
            navigate("/");
        }
    }
    // Función para redirigir a la ruta correspondiente al botón presionado
    const redirigir = (ruta) => {
        navigate(ruta);
    }

    return (
        <div style={{ marginBottom: "100px" }}>
            <Logo></Logo>
            <h2 id="Bienvenido">Bienvenido, {usuario.Nombre}</h2>
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