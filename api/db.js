import mysql from "mysql2";

// Configuración de la conexión a la base de datos MySQL

export const db = mysql.createConnection({
    host: 'reportes-ceballoscoraldanielfernando-c5ad.l.aivencloud.com',
    port: 15496,
    user: 'avnadmin',
    password: '',
    database: 'reportematerial',
});



db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});
