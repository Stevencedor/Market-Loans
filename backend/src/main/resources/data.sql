use finanzas_db;

-- Usuarios | Preferiblemente agregarlos desde el front para obtener el hash de la contraseña
INSERT IGNORE INTO finanzas_db.usuario (id, nombre, username, email, password) VALUES (1, 'Carlos Bernal', 'admin', 'cabernal28@unisalle.edu.co', 'admin123'); 
INSERT IGNORE INTO finanzas_db.usuario (id, nombre, username, email, password) VALUES (2, 'Ana Gómez', 'anago', 'ana@example.com', 'abcd');
INSERT IGNORE INTO finanzas_db.usuario (id, nombre, username, email, password) VALUES (3, 'Juan Pérez', 'juanpe','juan@example.com', '1234');

-- Categorías
INSERT IGNORE INTO finanzas_db.categoria (id, nombre, descripcion) VALUES (1, 'Alimentación','');
INSERT IGNORE INTO finanzas_db.categoria (id, nombre, descripcion) VALUES (2, 'Transporte', '');
INSERT IGNORE INTO finanzas_db.categoria (id, nombre, descripcion) VALUES (3, 'Salud', '');

-- Movimientos
INSERT IGNORE INTO finanzas_db.movimiento (id, descripcion, monto, fecha, tipo, categoria_id, usuario_id) VALUES (1, 'Compra supermercado', 150000.00, '2025-06-01', 'GASTO', 1, 1);
INSERT IGNORE INTO finanzas_db.movimiento (id, descripcion, monto, fecha, tipo, categoria_id, usuario_id) VALUES (2, 'Taxi', 30000.00, '2025-06-02', 'GASTO', 2, 1);
INSERT IGNORE INTO finanzas_db.movimiento (id, descripcion, monto, fecha, tipo, categoria_id, usuario_id) VALUES (3, 'Medicinas', 60000.00, '2025-06-03', 'INGRESO', 3, 2);