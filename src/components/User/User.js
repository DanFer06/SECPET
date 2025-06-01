import "./User.css";
import { useState, useRef, useEffect } from "react";
//Muestra la información básica del usuario para el administrador

function User({ usuario }) {
    const [menuOpen, actualizarMenuOpen] = useState(false);

    const menuRef = useRef(null);
    const botonRef = useRef(null);

    let TipoUsuario = "";
    if (usuario.idTipoUsuario === 1) {
        TipoUsuario = "Administrador";
    } else if (usuario.idTipoUsuario === 2) {
        TipoUsuario = "Analista de Inventario";
    } else {
        TipoUsuario = "Lider de Cuadrilla"
    }

    const toggleMenu = () => {
        actualizarMenuOpen(prev => !prev);
    }

    useEffect(() => {
        const clicAfuera = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) &&
                botonRef.current && !botonRef.current.contains(event.target)) {
                actualizarMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", clicAfuera);
        return () => {
            document.removeEventListener("mousedown", clicAfuera);
        };
    }, []);

    const userInfo = () => {
        actualizarMenuOpen(false);
        if (menuOpen) {
            // Aquí puedes agregar la lógica para mostrar la información del usuario
            console.log("Información del usuario:", usuario);
        }
    }

    const userModify = () => {
        actualizarMenuOpen(false);
        // Aquí puedes agregar la lógica para modificar el usuario
        console.log("Modificar usuario:", usuario);
    }

    const userDelete = () => {
        actualizarMenuOpen(false);
        // Aquí puedes agregar la lógica para eliminar el usuario
        console.log("Eliminar usuario:", usuario);
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