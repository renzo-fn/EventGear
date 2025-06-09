create database EventGear


create table Cliente (

id_cliente varchar(100) PRIMARY KEY,
Nombre varchar (100),
Correo  varchar (100) UNIQUE,
Contraseña varchar (100) NOT NULL,
DNI int NOT NULL,
RUC int NOT NULL,


);

Create table Administrador(
id_administrador varchar(100) PRIMARY KEY,
Nombre varchar (100),
DNI int,
Telefono int,
Correo varchar(100),
Contraseña varchar(100)


);

create table Datos_Empleado(
id_DatosEmpleado varchar(100) PRIMARY KEY,
Nombre_empleado varchar  (100),
Correo varchar(100),
DNI int NOT NULL,
Telefono int NOT NULL,
Fecha_Contratacion DATE NOT NULL,
id_administrador varchar(100),
FOREIGN KEY (id_administrador) REFERENCES Administrador(id_administrador)

);


create table Catalogo (

id_equipo varchar(100) PRIMARY KEY,
nombre varchar (100),
Modelo varchar(100),
Tipo_Producto varchar(100),
Precio int,
Disponibilidad varchar(100),
CHECK (Disponibilidad IN ('Si','No')),
id_cliente varchar(100) ,
id_administrador varchar(100),
FOREIGN KEY (id_cliente) REFERENCES Cliente (id_cliente),
FOREIGN KEY (id_administrador) REFERENCES Administrador(id_administrador)

);


create table Reserva (

id_reserva varchar(100) PRIMARY KEY,
id_cliente varchar(100),
id_equipo varchar(100),
Fecha_inicio DATE,
Hora_Reserva int,
Lugar_Destino varchar(100),
Hora_Devolucion int,
Estado_reserva varchar(50),
CONSTRAINT Estado_reserva CHECK (Estado_reserva IN ('pendiente', 'confirmada', 'cancelada')),
CONSTRAINT fk_cliente_reserva FOREIGN KEY (id_cliente) REFERENCES Cliente (id_cliente),
CONSTRAINT fk_equipo_reserva FOREIGN KEY (id_equipo) REFERENCES Catalogo(id_equipo),
);


create table TipoPago (
id_TipoPago varchar(100) PRIMARY KEY,
NumTarjeta int,
NumCelular int,
NombreBanco varchar(100)
);

create table Pago (

id_pago varchar(100) PRIMARY KEY,
id_cliente varchar(100),
monto DECIMAL(10, 2),
Extra_Hora int,
Distancia int,
Extra_Distancia int,
fecha_pago DATE,
MontoTotal int,
RUC int,
id_TipoPago varchar(100),
estado_pago varchar(50),
CONSTRAINT estado_pago CHECK (estado_pago IN ('pendiente', 'pagado', 'fallido')),
CONSTRAINT fk_cliente_pago FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
CONSTRAINT fk_tipopago_pago FOREIGN KEY (id_TipoPago) REFERENCES TipoPago (id_TipoPago)
);



CREATE TABLE Reporte (
    id_reporte VARCHAR(100) PRIMARY KEY,
    id_reserva VARCHAR(100),
    id_equipo VARCHAR(100),
	id_pago varchar (100),
    id_cliente VARCHAR(100),
    fecha_pedido DATE,
    Estado_pedido VARCHAR(50),
    MontoTotal INT,
    id_TipoPago VARCHAR(100),
    CONSTRAINT Estado_pedido CHECK (Estado_pedido IN ('procesando', 'enviado', 'fallido')),
    CONSTRAINT fk_reserva_reporte FOREIGN KEY (id_reserva) REFERENCES Reserva(id_reserva),
    CONSTRAINT fk_equipo_reporte FOREIGN KEY (id_equipo) REFERENCES Catalogo(id_equipo),
    CONSTRAINT fk_cliente_reporte FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
	CONSTRAINT fk_pago_reporte FOREIGN KEY (id_pago) REFERENCES Pago(id_pago),
    CONSTRAINT fk_tipopago_reporte FOREIGN KEY (id_TipoPago) REFERENCES TipoPago(id_TipoPago)

);
