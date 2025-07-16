const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());

const config = {
    server: 'DESKTOP-AAOPGU7\SQLEXPRESS',
    database: 'EventGear',
    options: {
        encrypt: false,
        trustServerCertificate: true
    },
    authentication: {
        type: 'ntlm',
        options: {
            domain: 'DESKTOP-AAOPGU7', // tu nombre de máquina
            userName: '',              // puedes dejarlo en blanco si usas sesión activa
            password: ''               // o dejar en blanco también
        }
    }
};

app.get('/catalogo', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM catalogo');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error al conectar con SQL Server');
    }
});

app.listen(3000, () => {
    console.log('API corriendo en http://localhost:3000');
});