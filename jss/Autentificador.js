document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const contraseña = document.getElementById('contraseña').value;
    const rol = document.getElementById('rol').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, contraseña, rol })
    })
    .then(res => res.json())
    .then(data => {
        if (data.mensaje) {
            alert('✅ Bienvenido ' + rol.toUpperCase());
            // Redireccionar según el rol
            if (rol === 'administrador') {
                window.location.href = 'admin.html';
            } else if (rol === 'cliente') {
                window.location.href = 'cliente.html';
            }
        } else {
            alert('❌ ' + (data.error || 'Error desconocido'));
        }
    })
    .catch(err => {
        console.error('Error de conexión:', err);
        alert('❌ Error al conectar con el servidor');
    });
});