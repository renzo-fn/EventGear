document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Evita que el formulario se envíe automáticamente

  const usuario = document.getElementById("usuario").value;
  const contraseña = document.getElementById("contraseña").value;
  const rol = document.getElementById("rol").value;

  if (!rol) {
    alert("Por favor, selecciona un rol.");
    return;
  }

  if (rol === "cliente") {
    // Redirige a la página del cliente
    window.location.href = "EventGear.html";
  } else if (rol === "administrador") {
    // Redirige a la página del administrador
    window.location.href = "Trabajadores.html";
  }
});
