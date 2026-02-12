import Header from "../../Header/Header";
import "./userInfo.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../axiosConfig";
import Footer from "../../Footer/Footer";


function UserInfo() {
    const [loading, setLoading] = useState(true);
    const { idUsuario } = useParams(); // Obtiene el id del usuario desde la URL
    const [usuario, actualizarUsuario] = useState({});

    useEffect(() => {
        // Función para obtener la información del usuario
        const obtenerUsuario = async () => {
            try {
                const response = await api.get(`/usuarios/${idUsuario}`);
                const data = await response.data;
                actualizarUsuario(data);
                setLoading(false);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        obtenerUsuario();
    }, [idUsuario]);

    return (
        <div style={{ marginBottom: "100px" }}>
            <Header text="Información del Usuario" volver={"/Users"}></Header>
            <div className="userInfo">
                {loading ? (<p>Cargando información de usuario...</p>) : (
                    <div>
                        <img src="/iconos/User.png" alt="Usuario"></img>
                        <p><b>Tipo de Usuario:</b> {usuario.idTipoUsuario === 1 ? "Administrador" : usuario.idTipoUsuario === 2 ? "Analista de Inventario" : "Lider de Cuadrilla"}</p>
                        <p><b>Nombre completo:</b> {usuario.Nombre} {usuario.Apellido}</p>
                        <p><b>Cédula:</b> {usuario.Cedula}</p>
                        <p><b>Correo Electrónico:</b> {usuario.Email}</p>
                        {(usuario.idTipoUsuario === 2 || usuario.idTipoUsuario === "2") &&
                            <p><b>Id de Bodega:</b> {usuario.idBodega}</p>
                        }
                        {(usuario.idTipoUsuario === 3 || usuario.idTipoUsuario === "3") &&
                            <p><b>Número de Cuadrilla:</b> {usuario.NumCuadrilla}</p>
                        }
                    </div>
                )}
            </div>
            <Footer></Footer>
        </div>
    );
}

export default UserInfo;