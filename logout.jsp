<%@ page session="true" %>
<%
    session.invalidate(); // elimina la sesión del usuario
    response.sendRedirect("login.jsp"); // redirige al login o inicio
%>