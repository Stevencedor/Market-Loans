package com.finanzas.repository;

import com.finanzas.model.Movimiento;
import com.finanzas.model.Usuario;
import com.finanzas.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface MovimientoRepository extends JpaRepository<Movimiento, Long> {
    List<Movimiento> findByUsuario(Usuario usuario);
    List<Movimiento> findByCategoria(Categoria categoria);
    List<Movimiento> findByUsuarioAndFechaBetween(Usuario usuario, LocalDateTime fechaInicio, LocalDateTime fechaFin);
}