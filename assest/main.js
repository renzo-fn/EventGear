document.addEventListener("DOMContentLoaded", () => {
  const monto = parseFloat(document.getElementById('monto').value);
  const igv = monto * 0.18;
  const total = monto + igv;

  document.getElementById("igv").value = igv.toFixed(2);
  document.getElementById("total").value = total.toFixed(2);
  document.getElementById("totalHidden").value = total.toFixed(2);

  const qrInput = document.getElementById("qrInput");
  const qrStatus = document.getElementById("qrStatus");
  const pagarBtn = document.getElementById("pagarBtn");

  qrInput.addEventListener("change", () => {
    const file = qrInput.files[0];
    if (!file || !file.name.endsWith(".jpeg")) {
      qrStatus.textContent = "Debe subir un archivo JPEG";
      pagarBtn.disabled = true;
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const fakeContent = "yapeCliente"; // Simulación del contenido
      const valido = fakeContent.includes("yapeCliente");
      if (valido) {
        qrStatus.textContent = "QR válido: yapeCliente";
        pagarBtn.disabled = false;
      } else {
        qrStatus.textContent = "QR inválido";
        pagarBtn.disabled = true;
      }
    };
    reader.readAsDataURL(file);
  });
});

function validarPago() {
  return !document.getElementById("pagarBtn").disabled;
}