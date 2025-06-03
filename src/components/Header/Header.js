import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ text, icono, TextoAlternativo, volver, redirigir }) {
    const navigate = useNavigate();

    // Función para regresar a la página anterior
    const regresar = () => {
        navigate(volver);
    }

    // Función para redirigir a otra página
    const funcion = () => {
        navigate(redirigir)
    }

    return (
        <div>
            <div id="volver">
            <button onClick={regresar}>
                <img src="/iconos/angulo-izquierdo.png" alt=""></img>
                <span>Volver</span>
            </button>
            </div>
            <div className="encabezado">
                <h2>{text}</h2>
                {icono && // Si se proporciona un icono, se muestra
                    <div className="iconos" onClick={funcion}>
                        <img src={icono} alt={TextoAlternativo} />
                    </div>}
            </div>
        </div>
    )
}
export default Header;