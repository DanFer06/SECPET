import { useEffect, useState } from "react";
import "./Plantilla.css"
import { useParams, useNavigate } from "react-router-dom";
import api from "../../axiosConfig";
import Logo from "../Logo/Logo.js"

// Esta es una plantilla que se utilizará en la página principal para todos los usuarios
//La función recibe el nombre y los botones dependiendo del usuario

function Plantilla() {
    const { idUsuario } = useParams();
    const navigate = useNavigate();
    const [usuario, actualizarUsuario] = useState("");
    const [lista_botones, actualizarBotones] = useState([]);
    

    useEffect(
        () => {
            console.log("hola");
            api.get(`/usuarios/${idUsuario}`)
                .then(response => {
                    console.log(response)
                    actualizarUsuario(response.data.Nombre);
                    console.log(response.data);
                    if (response.data) {
                        console.log("hay dato");
                        console.log(usuario)
                        if (response.data.idTipoUsuario === 1) {
                            // Es un administrador
                            console.log("Es admin")
                            actualizarBotones([
                                {
                                    imagen: "/Iconos/usuarios.png",
                                    texto: "Usuarios"
                                },
                            ])
                        } else if (response.data.idTipoUsuario === 2) {
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
                        } else if (response.data.idTipoUsuario === 3) {
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
                })
                .catch(error => {
                    console.log("El usuario no existe")
                    navigate("/")
                })
        }, [idUsuario]
    )
    // console.log(lista_botones)
    return (
        <div>
            <Logo></Logo>
            Bienvenido ... {usuario}
            <form>
                <div class="Botones">
                    <div class="Forma">
                        {lista_botones && lista_botones.map((boton) =>
                            <button>
                                <img src={boton.imagen} alt="Icono"></img>
                                <span>{boton.texto}</span>
                            </button>
                        )}
                    </div>
                </div>
                <div class="Salir">
                    <button>Salir</button>
                </div>
            </form>

        </div>
    );
}

export default Plantilla;