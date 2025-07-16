fetch('http://localhost:3000/catalogo')
        .then(response => response.json())
        .then(data => {
            const contenedor = document.getElementById('catalogo-admin');
            data.forEach(producto => {
                contenedor.innerHTML += `
                    <div class="producto">
                        <h3>${producto.Nombre}</h3>
                        <p>Precio: S/ ${producto.Precio}</p>
                    </div>
                `;
            });
        })
        .catch(err => console.error('Error cargando el catálogo:', err));