import "./Button.css";
//Botón utilizado en varias paginas, ejemplo seguir o enviar
function Button({text, url}) {
    return (
        <div>
            <button id="boton">
                <span>{text}</span>
                <img src={url} alt="icono"></img>
            </button>
        </div>
    )
}
export default Button;