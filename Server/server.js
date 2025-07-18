const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json()); // 

const db = mysql.createConnection({
    host: 'eventgear.alwaysdata.net',
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

app.put('/catalogo/:id', (req, res) => {

    const id = req.params.id;
    const { cantidad } = req.body;

    if (typeof cantidad !== 'number' || cantidad < 0) {
        return res.status(400).json({ error: 'Cantidad inválida. No puede ser menor que 0.' });
    }

    const disponibilidad = cantidad > 0 ? 'Disponible' : 'No disponible';

    const sql = 'UPDATE catalogo SET Cantidad = ? WHERE id_equipo = ?';

    connection.query(sql, [cantidad, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar cantidad:', err);
            res.status(500).json({ error: 'Error en la base de datos' });
            return;
        }

        res.json({ mensaje: 'Cantidad actualizada correctamente', result });
    });
});



app.post('/login', (req, res) => {
    const { usuario, contraseña, rol } = req.body;
    console.log('📥 Datos recibidos:', { usuario, contraseña, rol });

    let sql;
    let params;

    if (rol === 'administrador') {
        sql = 'SELECT * FROM Administrador WHERE id_administrador = ? AND Contraseña = ?';
        params = [usuario, contraseña];
    } else if (rol === 'cliente') {
        sql = 'SELECT * FROM Cliente WHERE id_cliente = ? AND Contraseña = ?';
        params = [usuario, contraseña];
    } else {
        return res.status(400).json({ error: 'Rol inválido' });
    }

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error('❌ Error de base de datos:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        console.log('📦 Resultado:', results);

        if (results.length > 0) {
            res.json({ mensaje: 'Inicio de sesión correcto', datos: results[0], rol });
        } else {
            res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }
    });
});

app.listen(3000, () => {
    console.log('🌐 API corriendo en http://localhost:3000');
});