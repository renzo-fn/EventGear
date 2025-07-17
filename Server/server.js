const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json()); // <- necesario para req.body

const db = mysql.createConnection({
    host: 'mysql-eventgear.alwaysdata.net',
    user: 'eventgear',
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

app.get('/catalogo', (req, res) => {
    db.query('SELECT * FROM Catalogo', (err, results) => {
        if (err) {
            console.error('❌ Error en la consulta:', err);
            return res.status(500).send('Error al consultar la base de datos');
        }
        res.json(results);
    });
});

app.post('/login', (req, res) => {
    const { usuario, Contraseña, rol } = req.body;

    if (rol === 'administrador') {
        const sql = 'SELECT * FROM Administrador WHERE id_administrador = ? AND Contraseña = ?';
        db.query(sql, [usuario, Contraseña], (err, results) => {
            if (err) {
                console.error('❌ Error de base de datos:', err);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }

            if (results.length > 0) {
                console.log("✅ Login exitoso:", results[0]);
                res.json({ mensaje: 'Inicio de sesión correcto' });
            } else {
                console.log("❌ Login fallido para:", usuario);
                res.status(401).json({ error: 'Credenciales incorrectas' });
            }
        });
    } else {
        res.status(403).json({ error: 'Rol no autorizado o aún no implementado' });
    }
});

app.listen(3000, () => {
    console.log('🌐 API corriendo en http://localhost:3000');
});

