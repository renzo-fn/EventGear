<%@ page import="java.sql.*, java.util.*" %>
<%@ page session="true" %>
<%
String id_cliente = request.getParameter("id_cliente");
String totalStr = request.getParameter("total");
double total = Double.parseDouble(totalStr);

String url = "jdbc:mysql://mysql-eventgear.alwaysdata.net:3306/eventgear_bd";
String user = "eventgear";
String pass = "x7dKDGZgBx5Dn6d";

Connection conn = null;
PreparedStatement stmt = null;

try {
    Class.forName("com.mysql.cj.jdbc.Driver");
    conn = DriverManager.getConnection(url, user, pass);

    String sql = "INSERT INTO Pago (id_cliente, monto, fecha_pago) VALUES (?, ?, NOW())";
    stmt = conn.prepareStatement(sql);
    stmt.setString(1, id_cliente);
    stmt.setDouble(2, total);
    stmt.executeUpdate();

    session.setAttribute("pago_total", total);
    session.setAttribute("cliente_actual", id_cliente);
    response.sendRedirect("reporte.jsp");

} catch (Exception e) {
    out.println("Error: " + e.getMessage());
    e.printStackTrace();
} finally {
    if (stmt != null) stmt.close();
    if (conn != null) conn.close();
}
%>
