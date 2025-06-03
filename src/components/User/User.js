import "./User.css";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../../axiosConfig";

//Muestra la información básica del usuario para el administrador

function User({ usuario }) {
    const navigate = useNavigate();
    const [menuOpen, actualizarMenuOpen] = useState(false);

    // Referencias para el menú desplegable y el botón
    // Se utilizan para detectar clics fuera del menú y cerrar el menú si es necesario
    const menuRef = useRef(null);
    const botonRef = useRef(null);

    // Determina el tipo de usuario basado en el idTipoUsuario
    let TipoUsuario = "";
    if (usuario.idTipoUsuario === 1) {
        TipoUsuario = "Administrador";
    } else if (usuario.idTipoUsuario === 2) {
        TipoUsuario = "Analista de Inventario";
    } else {
        TipoUsuario = "Lider de Cuadrilla"
    }

    // Función para alternar el estado del menú desplegable
    const toggleMenu = () => {
        actualizarMenuOpen(prev => !prev);
    }

    // Efecto para manejar clics fuera del menú
    useEffect(() => {
        const clicAfuera = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) &&
                botonRef.current && !botonRef.current.contains(event.target)) {
                actualizarMenuOpen(false);
            }
        };

        // Agrega el evento de clic al documento para detectar clics fuera del menú
        document.addEventListener("mousedown", clicAfuera);
        return () => {
            document.removeEventListener("mousedown", clicAfuera);
        };
    }, []);

    // Funciones para manejar las acciones del menú
    // Información del usuario
    const userInfo = () => {
        actualizarMenuOpen(false);
        if (menuOpen) {
            navigate(`/userInfo/${usuario.idUsuario}`);
        }
    }

    // Modificar usuario
    const userModify = () => {
        actualizarMenuOpen(false);
        console.log("Modificar usuario:", usuario);
        navigate(`/modifyUser/${usuario.idUsuario}`);
    }

    // Eliminar usuario
    const userDelete = async () => {
        actualizarMenuOpen(false);
        // Confirmación antes de eliminar el usuario
        if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
            try {
                await api.delete(`/eliminarusuarios/${usuario.idUsuario}`);
                window.alert("Usuario eliminado correctamente.");
                console.log("Eliminar usuario:", usuario);
            } catch (error) {
                console.error("Error al eliminar el usuario:", error);
                window.alert("Error al eliminar el usuario. Por favor, inténtelo de nuevo.");
            }
        }
    }

    return (
        <div className="contenedorUser">
            <div className="User">
                <div className="name">
                    <p>{usuario.Nombre} {usuario.Apellido}</p>
                    <p>{usuario.Cedula}</p>
                </div>
                <p>{TipoUsuario}</p>
                <div className="botonMenu">
                    <img
                        src="iconos/menu-puntos-vertical.png"
                        alt="Menú"
                        onClick={toggleMenu}
                        ref={botonRef}>
                    </img>
                    {menuOpen && (
                        <div ref={menuRef} className="menuDesplegable">
                            <div onClick={userInfo} className="itemMenu">Info</div>
                            <div onClick={userModify} className="itemMenu">Modificar</div>
                            <div onClick={userDelete} className="itemMenu" style={{ color: 'rgb(255 0 0)' }}>Eliminar</div>
                        </div>)}
                </div>
            </div>
        </div>);
}
export default User;