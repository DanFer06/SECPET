import Footer from "../Footer/Footer";
import Logo from "../Logo/Logo";
import "./Login.css"

function Login() {
    return (
        <div>
            <Logo></Logo>
            <main>
                <section>
                    <h2>Bienvenido</h2>
                    <p>Por favor inicie sesión</p>
                </section>
                <div class="login-page">
                    <div class="form">
                        <form class="login-form">
                            <select name="Tipo de usuario" id="Usuario">
                                <option value="cero">Tipo de usuario</option>
                                <option value="admin">Administrador</option>
                                <option value="analista">Analista de inventario</option>
                                <option value="lider">Lider de cuadrilla</option>
                            </select>
                            <input id="usuario" type="text" placeholder="Usuario" />
                            <input id="contraseña" type="password" placeholder="Contraseña" />
                            <button id="ingresar">Ingresar</button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
}
export default Login