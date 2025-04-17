import "./Plantilla.css"

// Esta es una plantilla que se utilizará en la página principal para todos los usuarios
//La función recibe el nombre y los botones dependiendo del usuario

function Plantilla({ nombre, lista_botones }) {
    return (
        <div>
            Bienvenido ... {nombre}
            <form>
                <div class="Botones">
                    <div class="Forma">
                        {lista_botones.map((boton) =>
                            <button>
                                <img src={boton.imagen} alt="Img"></img>
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