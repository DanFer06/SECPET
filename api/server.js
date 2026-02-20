import express from "express";
import dotenv from "dotenv";
import router from "./Routes/routes.js";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;//Puerto de la api

app.use(cors());
app.use(express.json()); // Para que Express pueda leer el cuerpo de las peticiones JSON
app.use(router);


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor API escuchando en el puerto ${port}`);
});