import { Router } from "express";
import { db } from "../db.js";

const router = Router();

// Definición de rutas de la API

//Obtener de Usuarios

// Obtener todos los usuarios
router.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            res.status(500).json({ error: 'Error al obtener los datos' });
            return;
        }
        res.status(200).json(results);
    });
});

//Obtener usuario por cedula
router.get('/usuario/:Cedula', (req, res) => {
    const itemId = req.params.Cedula;
    db.query('SELECT * FROM usuarios WHERE Cedula = ?', [itemId], (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            res.status(500).json({ error: 'Error al obtener el dato' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: 'Dato no encontrado' });
            return;
        }
        res.status(200).json(results[0]);
    });
});

// Obtener usuario por id
router.get('/usuarios/:idusuario', (req, res) => {
    const itemId = req.params.idusuario;
    db.query('SELECT * FROM usuarios WHERE idUsuario = ?', [itemId], (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            res.status(500).json({ error: 'Error al obtener el dato' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: 'Dato no encontrado' });
            return;
        }
        res.status(200).json(results[0]);
    });
});

// Crear un nuevo usuario
router.post('/crearusuarios', (req, res) => {
    console.log(req.body)
    const {Cedula, Nombre, Apellido, Password, Email, NumCuadrilla, idBodega, idTipoUsuario} = req.body;
    db.query(`INSERT INTO usuarios SET 
        Cedula = '${Cedula}', 
        Nombre = '${Nombre}', 
        Apellido = '${Apellido}', 
        Password = '${Password}', 
        Email = '${Email}', 
        NumCuadrilla = '${NumCuadrilla}', 
        idBodega = ${idBodega}, 
        idTipoUsuario = ${idTipoUsuario}`, (err, results) => {
        if (err) {
            console.error('Error al insertar el dato:', err);
            res.status(500).json({ error: 'Error al crear el dato' });
            return;
        }
        res.status(201).json({ message: 'Dato creado exitosamente', insertId: results.insertId });
    });
});

// Actualizar información de usuario
router.put ('/actualizarusuarios/:idusuario', (req, res) => {
    // console.log(req.body)
    const itemId = req.params.idusuario;
    const {Cedula, Nombre, Apellido, Password, Email, NumCuadrilla, idBodega, idTipoUsuario} = req.body;
    db.query(`UPDATE usuarios SET 
        Cedula = '${Cedula}', 
        Nombre = '${Nombre}', 
        Apellido = '${Apellido}', 
        Password = '${Password}', 
        Email = '${Email}', 
        NumCuadrilla = '${NumCuadrilla}', 
        idBodega = ${idBodega}, 
        idTipoUsuario = ${idTipoUsuario}
        WHERE idUsuario = ${itemId}`, (err, results) => {
            //console.log(results)
        if (err) {
            console.error('Error al actualizar los datos:', err);
            res.status(500).json({ error: 'Error al actualizar los datos' });
            return;
        }
        if (results.affectedRows === 0) {
            console.log('El usuario no existe')
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.status(201).json({ message: 'Usuario actualizado exitosamente', Id: itemId });
    });
});

 //Eliminar usuario
 router.delete('/eliminarusuarios/:idusuario', (req, res) => {
    const itemId = req.params.idusuario;
    db.query('DELETE FROM usuarios WHERE idUsuario = ?', [itemId], (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            res.status(500).json({ error: 'Error al eliminar el dato' });
            return;
        }
        if (results.affectedRows === 0) {
            console.log('El usuario no existe')
            res.status(404).json({ message: 'Dato no encontrado' });
            return;
        }
        res.status(200).json({
            body: {
                message: 'El usuario fue eliminado satisfactoriamente'
            }
        });
    });
});

//Obtener los reportes

//Obtener todos los reportes
router.get('/reportematerial', (req, res) => {
    db.query('SELECT * FROM reportematerial', (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            res.status(500).json({ error: 'Error al obtener los datos' });
            return;
        }
        res.status(200).json(results);
    });
});

//Obtener reporte mediante id
router.get('/reportematerial/:idReporte', (req, res) => {
    const itemId = req.params.idReporte;
    db.query('SELECT * FROM reportematerial WHERE idReporte = ?', [itemId], (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            res.status(500).json({ error: 'Error al obtener el dato' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: 'Dato no encontrado' });
            return;
        }
        res.status(200).json(results[0]);
    });
});

//Obtener material por el id del reporte
router.get('/obtenermaterial/:idReporte', (req, res) => {
    const itemId = req.params.idReporte;
    db.query('SELECT * FROM material WHERE idReporte = ?', [itemId], (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            res.status(500).json({ error: 'Error al obtener los datos' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: 'Reporte no encontrado' });
            return;
        }
        res.status(200).json(results);
    });
});

//Enviar reporte
router.post('/enviarreporte', (req, res) => {
    // console.log(req.body)
    const {NumOT, FechaReporte, idUsuario, FechaCierreOT} = req.body;
    db.query(`INSERT INTO reportematerial SET 
        NumOT = '${NumOT}', 
        FechaReporte = '${FechaReporte}', 
        idUsuario = '${idUsuario}', 
        FechaCierreOT = '${FechaCierreOT}'`, (err, results) => {
        if (err) {
            console.error('Error al insertar el dato:', err);
            res.status(500).json({ error: 'Error al crear el dato' });
            return;
        }
        res.status(201).json({ message: 'Dato creado exitosamente', insertId: results.insertId });
    });
});

//Reportar Material
router.post('/material', (req, res) => {
    console.log(req.body)
    const {idReporte, CantMaterial, CodigoMaterial} = req.body;
    db.query(`INSERT INTO material SET 
        idReporte = '${idReporte}', 
        CantMaterial = '${CantMaterial}', 
        CodigoMaterial = '${CodigoMaterial}'`, (err, results) => {
        if (err) {
            console.error('Error al insertar el dato:', err);
            res.status(500).json({ error: 'Error al crear el dato' });
            return;
        }
        res.status(201).json({ message: 'Dato creado exitosamente', insertId: results.insertId });
    });
});

// Aprobar reporte
router.patch ('/aprobar/:idReporte', (req, res) => {
    // console.log(req.body)
    const itemId = req.params.idReporte;
    const {Aprobacion} = req.body;
    db.query(`UPDATE reportematerial SET 
        Aprobacion = '${Aprobacion}'
        WHERE idUsuario = ${itemId}`, (err, results) => {
            //console.log(results)
        if (err) {
            console.error('Error al aprobar el reporte:', err);
            res.status(500).json({ error: 'Error al aprobar el reporte' });
            return;
        }
        if (results.affectedRows === 0) {
            console.log('El reporte no existe')
            res.status(404).json({ message: 'Reporte no encontrado' });
            return;
        }
        res.status(201).json({ message: `Reporte ${Aprobacion} exitosamente`, Id: itemId });
    });
});


 export default router;
