function mostrarVista(idVista) {
            const vistas = document.querySelectorAll('.vista');
            vistas.forEach(v => v.style.display = 'none');
            document.getElementById(idVista).style.display = 'block';
        }

        window.onload = () => {
            mostrarVista('vista-Productos');
            cargarCatalogo();
        };

       function cargarCatalogo() {
    fetch('http://localhost:3000/catalogo')
        .then(response => response.json())
        .then(data => {
            const tabla = document.getElementById('tabla-productos');
            tabla.innerHTML = ''; 
            data.forEach(producto => {
                const disponibilidadTexto = producto.Cantidad > 0 ? producto.Disponibilidad : 'No disponible';

                tabla.innerHTML += `
                    <tr>
                        <td>${producto.id_equipo}</td>
                        <td>${producto.nombre}</td>
                        <td>${producto.Modelo}</td>
                        <td>${producto.Tipo_Producto}</td>
                        <td>${producto.Precio}</td>
                        <td class="disponibilidad">${disponibilidadTexto}</td>
                        <td>${producto.id_administrador}</td>
                        
                        <td>
                            <span class="cantidad">${producto.Cantidad}</span>
                            <button onclick="modificarCantidad(this, -1)">-</button>
                            <button onclick="modificarCantidad(this, 1)">+</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => {
            console.error('Error al cargar el catálogo:', error);
        });
}

function modificarCantidad(boton, cambio) {
    const fila = boton.closest('tr');
    const cantidadSpan = fila.querySelector('.cantidad');
    const disponibilidadTd = fila.querySelector('.disponibilidad');

    let cantidad = parseInt(cantidadSpan.textContent);
    cantidad += cambio;

    if (cantidad < 0) return;

    cantidadSpan.textContent = cantidad;

    if (cantidad === 0) {
        disponibilidadTd.textContent = 'No disponible';
    } else {
        disponibilidadTd.textContent = 'Disponible';
    }

   
}