import Header from "../../Header/Header";
import "./addUser.css";
//Formulario para añadir a un nuevo usuario
function AddUser() {
    console.log("addUser");
    return (
        <div>
            <Header text={"Crear nuevo usuario"} volver={"/Users"}></Header>
            <div className="formulario">
                <select id="usuarios">
                    <option value="cero">Tipo de usuario</option>
                    <option value="admin">Administrador</option>
                    <option value="analista">Analista de inventario</option>
                    <option value="lider">Lider de cuadrilla</option>
                </select>
                <input type="text" placeholder="Nombre"></input>
                <input type="text" placeholder="Apellido"></input>
                <input type="text" placeholder="No. cédula de ciudadanía"></input>
                <input type="text" placeholder="Email"></input>
                <input type="text" placeholder="Número de cuadrilla"></input>
            </div>
        </div>
    );
}

export default AddUser;