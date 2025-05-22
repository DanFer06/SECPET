import "./User.css";
//Muestra la información básica del usuario para el administrador
function User({usuario}) {
    let TipoUsuario = "";
    if (usuario.idTipoUsuario === 1) {
        TipoUsuario = "Administrador";
    } else if (usuario.idTipoUsuario === 2) {
        TipoUsuario = "Analista de Inventario";
    } else {
        TipoUsuario = "Lider de Cuadrilla"
    }
    return( 
    <div className="contenedor">
        <div className="User">
            <div class="name">
            <p>{usuario.Nombre} {usuario.Apellido}</p>
            <p>{usuario.Cedula}</p>
            </div>
            <p>{TipoUsuario}</p>
            <img src="iconos/menu-puntos-vertical.png" alt="Menú"></img>
        </div>
    </div>);
}
export default User;