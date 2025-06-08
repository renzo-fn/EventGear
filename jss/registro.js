function registrarUsuario() {
        const nombres = document.getElementById('nombres').value;
        const apellidos = document.getElementById('apellidos').value;
        const correo = document.getElementById('correo').value;
        const contraseña = document.getElementById('contraseña').value;
        const confirmarContraseña = document.getElementById('confirmarContraseña').value;
        const dni = document.getElementById('dni').value;
        const ruc = document.getElementById('ruc').value;

        if (!nombres || !apellidos || !correo || !contraseña || !confirmarContraseña || !dni) {
            alert('Por favor, complete todos los campos obligatorios.');
            return;
        }

        if (contraseña !== confirmarContraseña) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        
        alert('Registro exitoso. ¡Bienvenido!');
        window.location.href = 'EventGear.html';
    }