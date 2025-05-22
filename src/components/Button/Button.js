import "./Button.css";
//Botón utilizado en varias paginas, ejemplo seguir o enviar
function Button(text, icono) {
    return(
        <div>
            <button id="Boton">`${icono}, ${text}`</button>
        </div>
    )
}
export default Button;