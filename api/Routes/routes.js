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
    const { Cedula, Nombre, Apellido, Password, Email, NumCuadrilla, idBodega, idTipoUsuario } = req.body;
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
router.put('/actualizarusuarios/:idusuario', (req, res) => {
    const itemId = req.params.idusuario;
    const { Cedula, Nombre, Apellido, Password, Email, NumCuadrilla, idBodega, idTipoUsuario } = req.body;
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


//Obtener de reportes
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

//Obtener reporte por id de usuario
router.get('/reportematerial/usuario/:idUsuario', (req, res) => {
    const itemId = req.params.idUsuario;
    db.query('SELECT * FROM reportematerial WHERE idUsuario = ?', [itemId], (err, results) => {
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
            console.log("Dato no encontrado")
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
    const { NumOT, FechaReporte, idUsuario, FechaCierreOT } = req.body;
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
router.post('/material/:idReporte', (req, res) => {
    const reporteId = req.params.idReporte;
    console.log(req.body)
    const { materiales } = req.body; // Desestructurar el arreglo de materiales del cuerpo de la solicitud

    // Validar que se haya proporcionado un arreglo de materiales
    if (!materiales || !Array.isArray(materiales) || materiales.length === 0) {
        return res.status(400).json({ error: 'Se esperaba un arreglo de materiales' });
    }

    let insertCount = 0; // Contador para llevar el registro de inserciones exitosas
    let errorOccurred = false; // Variable para rastrear si ocurrió un error en alguna inserción

    // Iteramos sobre cada material y realizamos la inserción
    materiales.forEach(material => {
        const { cantMaterial, codigoMaterial } = material;

        db.query(`INSERT INTO material SET 
            idReporte = '${reporteId}', 
            CantMaterial = '${Number(cantMaterial)}', 
            CodigoMaterial = '${codigoMaterial}'`, (err, results) => {
            if (err) {
                console.error('Error al insertar el dato:', err);
                errorOccurred = true;
                return res.status(500).json({ error: 'Error al crear el dato' });
            }
            insertCount++;
            console.log(`Material insertado: ${codigoMaterial}, Cantidad: ${cantMaterial}, ID: ${results.insertId}`);

            if (insertCount === materiales.length && !errorOccurred) {
                res.status(201).json({ message: 'Datos creados exitosamente', insertCount });
            }
        });
    });
});

// Aprobar reporte
router.patch('/aprobar/:idReporte', (req, res) => {
    const itemId = req.params.idReporte;
    const { valor } = req.body;
    const { comentario } = req.body;
    db.query(`UPDATE reportematerial SET 
        Aprobacion = '${valor}',
        Comentario = '${comentario}'
        WHERE idReporte = ${itemId}`, (err, results) => {
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
        res.status(201).json({ message: `Reporte ${valor} exitosamente`, Id: itemId });
    });
});


export default router;
