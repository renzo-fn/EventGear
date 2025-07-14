<%@ page session="true" contentType="application/pdf" import="java.io.*, com.itextpdf.text.*, com.itextpdf.text.pdf.*" %>
<%
String idCliente = (String) session.getAttribute("cliente_actual");
Double total = (Double) session.getAttribute("pago_total");

ByteArrayOutputStream baos = new ByteArrayOutputStream();
Document document = new Document();
PdfWriter.getInstance(document, baos);
document.open();
document.add(new Paragraph("REPORTE DE PAGO - EVENTGEAR"));
document.add(new Paragraph("Cliente: " + idCliente));
document.add(new Paragraph("Monto pagado: S/ " + total));
document.add(new Paragraph("Fecha: " + new java.util.Date()));
document.close();

response.setHeader("Content-Disposition", "attachment; filename="reporte_pago.pdf"");
response.setContentLength(baos.size());
OutputStream os = response.getOutputStream();
baos.writeTo(os);
os.flush();
os.close();
%>
