const express = require('express');
const cors = require('cors');
const mysql = require('mysql2'); // ✅ Esta es la librería correcta para MySQL

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: 'mysql-eventgear.alwaysdata.net', // <- este debe ser el host exacto de alwaysdata
    user: 'eventgear',                      // <- corrige tu user, era mal escrito como 'ebentgear'
    password: 'x7dKDGZgBx5Dn6d',
    database: 'eventgear_bd',
    port: 3306
});

db.connect(err => {
    if (err) {
        console.error('❌ Error de conexión:', err);
        return;
    }
    console.log('✅ Conectado a la base de datos en alwaysdata.net');
});

// Ruta para obtener los datos del catálogo
app.get('/catalogo', (req, res) => {
    db.query('SELECT * FROM Catalogo', (err, results) => {
        if (err) {
            console.error('❌ Error en la consulta:', err);
            return res.status(500).send('Error al consultar la base de datos');
        }
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('🌐 API corriendo en http://localhost:3000');
});

// db.query('SHOW TABLES', (err, results) => {
//console.log(results);
//});


