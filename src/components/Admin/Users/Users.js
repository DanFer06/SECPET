import Header from "../../Header/Header";
import { useEffect, useState } from "react";
import api from "../../../axiosConfig";
import User from "../../User/User";
import Footer from "../../Footer/Footer";

function Users () {
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
    }, [Usuarios]);
    return (
        <div style={{ marginBottom: "160px" }}>
            <Header text={"Usuarios"} icono={"iconos/agregar-usuario.png"} volver={"/inicio"} TextoAlternativo={"Agregar usuario"} redirigir={"/addUser"}></Header>
            {Usuarios && Usuarios.map((user) =>
            <User usuario = {user} key={user.idUsuario}></User>
            )}   
            <Footer></Footer>
        </div>
    )
}
export default Users;