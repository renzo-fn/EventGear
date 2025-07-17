document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

  const usuario = document.getElementById("usuario").value;
  const contraseña = document.getElementById("contraseña").value;
  const rol = document.getElementById("rol").value;

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
            if (rol === 'administrador') {
                window.location.href = 'Trabajadores.html';
            } else {
                window.location.href = 'EventGear.html';
            }
        } else {
            alert('❌ ' + (data.error || 'Error desconocido'));
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        alert('❌ Error al conectarse con el servidor');
    }
});
