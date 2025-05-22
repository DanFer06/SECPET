import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ text, icono, TextoAlternativo, volver, redirigir }) {
    const navigate = useNavigate();
    const regresar = () => {
        navigate(volver);
    }
    const funcion = () => {
        navigate(redirigir)
    }
    return (
        <div>
            <div id="volver">
            <button onClick={regresar}>
                <img src="iconos/angulo-izquierdo.png" alt=""></img>
                <span>Volver</span>
            </button>
            </div>
            <div className="encabezado">
                <h2>{text}</h2>
                {icono &&
                    <div className="Usuarios" onClick={funcion}>
                        <img src={icono} alt={TextoAlternativo} />
                    </div>}
            </div>
        </div>
    )
}
export default Header;