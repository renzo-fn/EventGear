  let total = 0;

    function addToCart(precio) {
      total += precio;
      document.getElementById('total').textContent = `Total acumulado: S/${total.toFixed(2)}`;
    }

    function finalizarCompra() {
      alert(`El total de su compra es: S/${total.toFixed(2)}`);
      document.getElementById('formulario').classList.add('active'); // Muestra el formulario
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

      return false; // Evita que el formulario recargue la página
    }