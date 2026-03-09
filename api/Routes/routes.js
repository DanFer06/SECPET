import { Router } from "express";
import { db } from "../db.js";
import util from 'util';

const query = util.promisify(db.query).bind(db);
const router = Router();

// Definición de rutas de la API

//Obtener de Usuarios
// Obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
    try {
        const results = await query('SELECT * FROM usuarios');
        res.status(200).json(results);
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
});

// Obtener usuario por cedula
router.get('/usuario/:Cedula', async (req, res) => {
    const itemId = req.params.Cedula;
    try {
        const results = await query('SELECT * FROM usuarios WHERE Cedula = ?', [itemId]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Dato no encontrado' });
        }
        res.status(200).json(results[0]);
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).json({ error: 'Error al obtener el dato' });
    }
});

// Obtener usuario por id
router.get('/usuarios/:idusuario', async (req, res) => {
    const itemId = req.params.idusuario;
    try {
        const results = await query('SELECT * FROM usuarios WHERE idUsuario = ?', [itemId]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Dato no encontrado' });
        }
        res.status(200).json(results[0]);
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).json({ error: 'Error al obtener el dato' });
    }
});

// Crear un nuevo usuario
router.post('/crearusuarios', async (req, res) => {
    const { Cedula, Nombre, Apellido, Password, Email, NumCuadrilla, idBodega, idTipoUsuario } = req.body;
    try {
        const sql = `INSERT INTO usuarios SET 
            Cedula = '${Cedula}', 
            Nombre = '${Nombre}', 
            Apellido = '${Apellido}', 
            Password = '${Password}', 
            Email = '${Email}', 
            NumCuadrilla = '${NumCuadrilla}', 
            idBodega = ${idBodega}, 
            idTipoUsuario = ${idTipoUsuario}`;
        const results = await query(sql);
        res.status(201).json({ message: 'Dato creado exitosamente', insertId: results.insertId });
    } catch (err) {
        console.error('Error al insertar el dato:', err);
        res.status(500).json({ error: 'Error al crear el dato' });
    }
});

// Actualizar información de usuario
router.put('/actualizarusuarios/:idusuario', async (req, res) => {
    const itemId = req.params.idusuario;
    const { Cedula, Nombre, Apellido, Password, Email, NumCuadrilla, idBodega, idTipoUsuario } = req.body;
    try {
        const sql = `UPDATE usuarios SET 
            Cedula = '${Cedula}', 
            Nombre = '${Nombre}', 
            Apellido = '${Apellido}', 
            Password = '${Password}', 
            Email = '${Email}', 
            NumCuadrilla = '${NumCuadrilla}', 
            idBodega = ${idBodega}, 
            idTipoUsuario = ${idTipoUsuario}
            WHERE idUsuario = ${itemId}`;
        const results = await query(sql);
        if (results.affectedRows === 0) {
            console.log('El usuario no existe');
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(201).json({ message: 'Usuario actualizado exitosamente', Id: itemId });
    } catch (err) {
        console.error('Error al actualizar los datos:', err);
        res.status(500).json({ error: 'Error al actualizar los datos' });
    }
});

// Eliminar usuario
router.delete('/eliminarusuarios/:idusuario', async (req, res) => {
    const itemId = req.params.idusuario;
    try {
        const results = await query('DELETE FROM usuarios WHERE idUsuario = ?', [itemId]);
        if (results.affectedRows === 0) {
            console.log('El usuario no existe');
            return res.status(404).json({ message: 'Dato no encontrado' });
        }
        res.status(200).json({
            body: { message: 'El usuario fue eliminado satisfactoriamente' }
        });
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).json({ error: 'Error al eliminar el dato' });
    }
});


//Obtener de reportes
// Obtener todos los reportes
router.get('/reportematerial', async (req, res) => {
    try {
        const results = await query('SELECT * FROM reportematerial');
        res.status(200).json(results);
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
});

// Obtener reporte por id de usuario
router.get('/reportematerial/usuario/:idUsuario', async (req, res) => {
    const itemId = req.params.idUsuario;
    try {
        const results = await query('SELECT * FROM reportematerial WHERE idUsuario = ?', [itemId]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Reporte no encontrado' });
        }
        res.status(200).json(results);
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
});

// Obtener reporte mediante id
router.get('/reportematerial/:idReporte', async (req, res) => {
    const itemId = req.params.idReporte;
    try {
        const results = await query('SELECT * FROM reportematerial WHERE idReporte = ?', [itemId]);
        if (results.length === 0) {
            console.log("Dato no encontrado");
            return res.status(404).json({ message: 'Dato no encontrado' });
        }
        res.status(200).json(results[0]);
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).json({ error: 'Error al obtener el dato' });
    }
});

// Obtener material por el id del reporte
router.get('/obtenermaterial/:idReporte', async (req, res) => {
    const itemId = req.params.idReporte;
    try {
        const results = await query('SELECT * FROM material WHERE idReporte = ?', [itemId]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Reporte no encontrado' });
        }
        res.status(200).json(results);
    } catch (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
});

// Enviar reporte
router.post('/enviarreporte', async (req, res) => {
    const { NumOT, FechaReporte, idUsuario, FechaCierreOT } = req.body;
    try {
        const sql = `INSERT INTO reportematerial SET 
            NumOT = '${NumOT}', 
            FechaReporte = '${FechaReporte}', 
            idUsuario = '${idUsuario}', 
            FechaCierreOT = '${FechaCierreOT}'`;
        const results = await query(sql);
        res.status(201).json({ message: 'Dato creado exitosamente', insertId: results.insertId });
    } catch (err) {
        console.error('Error al insertar el dato:', err);
        res.status(500).json({ error: 'Error al crear el dato' });
    }
});

// Reportar Material
router.post('/material/:idReporte', async (req, res) => {
    const reporteId = req.params.idReporte;
    console.log(req.body);
    const { materiales } = req.body; // Desestructurar el arreglo de materiales del cuerpo de la solicitud

    // Validar que se haya proporcionado un arreglo de materiales
    if (!materiales || !Array.isArray(materiales) || materiales.length === 0) {
        return res.status(400).json({ error: 'Se esperaba un arreglo de materiales' });
    }

    try {
        let insertCount = 0;
        for (const material of materiales) {
            const { cantMaterial, codigoMaterial } = material;
            const sql = `INSERT INTO material SET 
                idReporte = '${reporteId}', 
                CantMaterial = '${Number(cantMaterial)}', 
                CodigoMaterial = '${codigoMaterial}'`;
            const results = await query(sql);
            insertCount++;
            console.log(`Material insertado: ${codigoMaterial}, Cantidad: ${cantMaterial}, ID: ${results.insertId}`);
        }
        res.status(201).json({ message: 'Datos creados exitosamente', insertCount });
    } catch (err) {
        console.error('Error al insertar el dato:', err);
        res.status(500).json({ error: 'Error al crear el dato' });
    }
});

// Aprobar reporte
router.patch('/aprobar/:idReporte', async (req, res) => {
    const itemId = req.params.idReporte;
    const { valor, comentario } = req.body;
    try {
        const sql = `UPDATE reportematerial SET 
            Aprobacion = '${valor}',
            Comentario = '${comentario}'
            WHERE idReporte = ${itemId}`;
        const results = await query(sql);
        if (results.affectedRows === 0) {
            console.log('El reporte no existe');
            return res.status(404).json({ message: 'Reporte no encontrado' });
        }
        res.status(201).json({ message: `Reporte ${valor} exitosamente`, Id: itemId });
    } catch (err) {
        console.error('Error al aprobar el reporte:', err);
        res.status(500).json({ error: 'Error al aprobar el reporte' });
    }
});


export default router;
