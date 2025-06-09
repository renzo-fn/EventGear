<%@ page import="java.sql.*, javax.sql.*" %>
<%@ page session="true" %>
<%
    String idCliente = (String) session.getAttribute("id_cliente");
    if (idCliente == null) {
        response.sendRedirect("login.jsp");
        return;
    }

    Connection conn = null;
    PreparedStatement stmt = null;
    ResultSet rs = null;
    double monto = 0.0;
    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
        conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/EventGear", "root", "");

        String sql = "SELECT c.nombre, c.Modelo, c.Precio FROM Reserva r JOIN Catalogo c ON r.id_equipo = c.id_equipo WHERE r.id_cliente = ? AND r.Estado_reserva = 'pendiente'";
        stmt = conn.prepareStatement(sql);
        stmt.setString(1, idCliente);
        rs = stmt.executeQuery();
%>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Página de Pago</title>
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <h1>Resumen del Pedido</h1>
  <ul id="lista-productos">
    <% while (rs.next()) {
        double precio = rs.getDouble("Precio");
        monto += precio;
    %>
      <li><%= rs.getString("nombre") %> - Modelo <%= rs.getString("Modelo") %> - S/ <%= precio %></li>
    <% } %>
  </ul>

  <div class="totales">
    <label>Monto: </label>
    <input type="text" id="monto" value="<%= monto %>" readonly><br>
    <label>IGV (18%): </label>
    <input type="text" id="igv" readonly><br>
    <label>Total: </label>
    <input type="text" id="total" readonly>
  </div>

  <h2>Sube tu código QR (JPEG)</h2>
  <input type="file" id="qrInput" accept="image/jpeg">
  <p id="qrStatus"></p>

  <form action="registrar_pago.jsp" method="post" onsubmit="return validarPago();">
    <input type="hidden" name="total" id="totalHidden">
    <input type="hidden" name="metodo" value="yapeCliente">
    <button id="pagarBtn" disabled>Pagar</button>
  </form>

  <script src="assets/main.js"></script>
</body>
</html>
<%
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        if (rs != null) rs.close();
        if (stmt != null) stmt.close();
        if (conn != null) conn.close();
    }
%>