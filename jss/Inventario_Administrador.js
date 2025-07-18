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
    const contenedor = boton.parentElement;
    const cantidadSpan = contenedor.querySelector('.cantidad');
    const fila = boton.closest('tr');
    const disponibilidadTd = fila.querySelector('.disponibilidad');

    let cantidad = parseInt(cantidadSpan.textContent);
    cantidad += cambio;
    if (cantidad < 0) return;

    cantidadSpan.textContent = cantidad;
    disponibilidadTd.textContent = cantidad === 0 ? "No disponible" : "Disponible";


    const id_equipo = fila.children[0].textContent;

    fetch(`http://localhost:3000/catalogo/${id_equipo}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cantidad: cantidad }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al actualizar en la base de datos');
        }
        return response.json();
    })
    .then(data => {
        console.log('Cantidad actualizada correctamente en la BD:', data);
    })
    .catch(error => {
        console.error('Error al actualizar:', error);
        alert("Hubo un error al actualizar en la base de datos");
    });
}