
<%@ page session="true" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Pago - Eventgear</title>
    <link rel="stylesheet" href="css/estilo.css">
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            background-color: #f0f0f5;
            margin: 0; padding: 0;
        }
        .container {
            max-width: 700px;
            margin: 40px auto;
            background: #fff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
        }
        h2 {
            text-align: center;
            margin-bottom: 20px;
            color: #333;
        }
        .qr-box {
            text-align: center;
        }
        .qr-box img {
            max-width: 150px;
            margin: 10px;
        }
        .datos {
            margin: 20px 0;
        }
        .boton {
            text-align: center;
        }
        .boton button {
            background-color: #5e00d6;
            color: white;
            padding: 12px 25px;
            font-size: 16px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
        }
    </style>
</head>
<body>
<div class="container">
    <h2>Pagar con Yape</h2>
    <div class="qr-box">
        <img src="imagenes/logo yape.png" alt="Logo Yape">
        <br>
        <img src="imagenes/qr yape.jpg" alt="QR Yape">
    </div>
    <div class="datos">
        <p><strong>Cliente:</strong> <%= session.getAttribute("cliente") != null ? session.getAttribute("cliente") : "Invitado" %></p>
        <p><strong>Monto base:</strong> S/ <%= session.getAttribute("subtotal") != null ? session.getAttribute("subtotal") : "0.00" %></p>
        <p><strong>IGV (18%):</strong> S/ <%= session.getAttribute("igv") != null ? session.getAttribute("igv") : "0.00" %></p>
        <p><strong>Total a pagar:</strong> S/ <%= session.getAttribute("total") != null ? session.getAttribute("total") : "0.00" %></p>
    </div>
    <div class="boton">
        <form action="reporte_pago.jsp" method="post">
            <button type="submit">Confirmar pago</button>
        </form>
    </div>
</div>
</body>
</html>
