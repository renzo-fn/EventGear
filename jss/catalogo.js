let total = 0;  

        function aumentar(id) {
            const input = document.getElementById(`cantidad-${id}`);
            let cantidad = parseInt(input.value, 10);
            cantidad++;
            input.value = cantidad;
        }

        function disminuir(id) {
            const input = document.getElementById(`cantidad-${id}`);
            let cantidad = parseInt(input.value, 10);
            if (cantidad > 0) {
                cantidad--;
            }
            input.value = cantidad;
        }

    function addToCart(id, nombreProducto, precio) {
            const input = document.getElementById(`cantidad-${id}`);
            const cantidad = parseInt(input.value, 10);

            if (cantidad > 0) {
                total += cantidad * precio; // Calcular y acumular el precio total
                actualizarTotal();
                input.value = 0; // Reiniciar cantidad
            } else {
                alert("La cantidad debe ser mayor a 0");
            }}

    function actualizarTotal() {
            const totalElemento = document.getElementById("total");
            totalElemento.textContent = `Total: $${total}`;
        }

    function finalizarCompra() {
      alert(`El total de su compra es: S/${total.toFixed(2)}`);
      document.getElementById('formulario').classList.add('active'); // Muestra el formulario
    }

    function mostrarFormulario() {
            document.getElementById(`formulario`).classList.add('active');
        }

    function cerrarFormulario() {
            document.getElementById(`formulario`).classList.remove('active');
        }

    

    function calcularTotal() {
      const tiempo = parseFloat(document.getElementById('tiempo').value) || 0;
      const distancia = parseFloat(document.getElementById('distancia').value) || 0;

      const hourlyRate = 5;
      const distanceRate = 2;

      const totalFinal = total + tiempo * hourlyRate + distancia * distanceRate;
      document.getElementById('totalFinal').textContent = `Total a pagar: S/${totalFinal.toFixed(2)}`;

    }

    const totalElemento = document.getElementById("total");
    totalElemento.textContent = `Total acumulado: S/${total.toFixed(2)}`;

    const pagarBoton = document.getElementById("pagar");
    if (total > 0) {
        pagarBoton.style.display = "inline-block";
    }
    
    function redirigir() {
    window.location.href = "pago.jsp";
    }
    document.addEventListener('DOMContentLoaded', function () {
    const pagarBoton = document.getElementById("pagar");
    pagarBoton.addEventListener('click', redirigir);
});