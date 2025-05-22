import Header from "../../Header/Header";
import { useEffect, useState } from "react";
import api from "../../../axiosConfig";
import User from "../../User/User";

function Users () {
    const volver = "/inicio"
    const [Usuarios, actualizarUsuarios] = useState([]);
    useEffect(() =>{
        const obtenerUsuarios = async() => {
            try {
                const response = await api.get("/usuarios");
                console.log(response.data)
                actualizarUsuarios(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        obtenerUsuarios();
    }, []);
    return (
        <div>
            <Header text={"Usuarios"} icono={"iconos/agregar-usuario.png"} volver={volver} TextoAlternativo={"Agregar usuario"} redirigir={"/addUser"}></Header>
            {Usuarios && Usuarios.map((user) =>
            <User usuario = {user}></User>
            )}   
        </div>
    )
}
export default Users;