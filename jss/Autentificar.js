document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const contraseña = document.getElementById('contraseña').value;
    const rol = document.getElementById('rol').value.toLowerCase(); // asegurar minúsculas

    const payload = {
        usuario,
        contraseña,
        rol
    };

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            alert('✅ Inicio de sesión exitoso');
            // Redireccionar a página del administrador (ajusta el nombre si es diferente)
            if (rol === 'administrador') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'cliente.html';
            }
        } else {
            alert('❌ ' + data.error);
        }
    } catch (error) {
        console.error('⚠️ Error en la solicitud:', error);
        alert('❌ Error al conectarse con el servidor');
    }
});