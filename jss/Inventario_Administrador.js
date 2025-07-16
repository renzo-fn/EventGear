function mostrarVista(idVista) {
            const vistas = document.querySelectorAll('.vista');
            vistas.forEach(v => v.style.display = 'none');
            document.getElementById(idVista).style.display = 'block';
        }

        // Mostrar vista de productos al cargar la página por defecto
        window.onload = () => {
            mostrarVista('vista-Productos');
            cargarCatalogo();
        };

        function cargarCatalogo() {
            fetch('http://localhost:3000/Catalogo')
                .then(response => response.json())
                .then(data => {
                    const tabla = document.getElementById('tabla-productos');
                    tabla.innerHTML = ''; // limpiar antes de cargar
                    data.forEach(producto => {
                        tabla.innerHTML += `
                            <tr>
                                <td>${producto.id_equipo}</td>
                                <td>${producto.nombre}</td>
                                <td>${producto.Modelo}</td>
                                <td>${producto.Tipo_Producto}</td>
                                <td>${producto.Precio}</td>
                                <td>${producto.Disponibilidad}</td>
                                <td>${producto.id_administrador}</td>
                            </tr>
                        `;
                    });
                })
                .catch(error => {
                    console.error('Error al cargar el catálogo:', error);
                });
        }

