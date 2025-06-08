function mostrarFormulario(tipo) {
            document.getElementById(`form-${tipo}`).classList.add('active');
        }

        function cerrarFormulario(tipo) {
            document.getElementById(`form-${tipo}`).classList.remove('active');
        }

        function agregarTrabajador() {
            const nombre = document.getElementById('agregar-nombre').value;
            const correo = document.getElementById('agregar-correo').value;
            const dni = document.getElementById('agregar-dni').value;
            const telefono = document.getElementById('agregar-telefono').value;
            const fecha = document.getElementById('agregar-fecha').value;

            const tabla = document.getElementById('tabla-trabajadores');
            const nuevaFila = document.createElement('tr');
            nuevaFila.innerHTML = `<td>${nombre}</td><td>${correo}</td><td>${dni}</td><td>${telefono}</td><td>${fecha}</td>`;
            tabla.appendChild(nuevaFila);

            cerrarFormulario('agregar');
            return false;
        }

        function editarTrabajador() {
            const nombreActual = document.getElementById('editar-nombre-actual').value;
            const nombre = document.getElementById('editar-nombre').value;
            const correo = document.getElementById('editar-correo').value;
            const dni = document.getElementById('editar-dni').value;
            const telefono = document.getElementById('editar-telefono').value;
            const fecha = document.getElementById('editar-fecha').value;

            const filas = document.querySelectorAll('#tabla-trabajadores tr');
            for (let fila of filas) {
                if (fila.children[0].textContent === nombreActual) {
                    if (nombre) fila.children[0].textContent = nombre;
                    if (correo) fila.children[1].textContent = correo;
                    if (dni) fila.children[2].textContent = dni;
                    if (telefono) fila.children[3].textContent = telefono;
                    if (fecha) fila.children[4].textContent = fecha;

                    cerrarFormulario('editar');
                    return false;
                }
            }
            alert('Trabajador no encontrado.');
            return false;
        }

        function eliminarTrabajador() {
            const nombre = document.getElementById('eliminar-nombre').value;
            const filas = document.querySelectorAll('#tabla-trabajadores tr');
            for (let i = 0; i < filas.length; i++) {
                if (filas[i].children[0].textContent === nombre) {
                    filas[i].remove();
                    cerrarFormulario('eliminar');
                    return false;
                }
            }
            alert('Trabajador no encontrado.');
            return false;
        }