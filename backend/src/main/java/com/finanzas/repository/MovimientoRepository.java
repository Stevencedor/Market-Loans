package com.finanzas.repository;

import com.finanzas.model.Movimiento;
import com.finanzas.model.Usuario;
import com.finanzas.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovimientoRepository extends JpaRepository<Movimiento, Long> {
    List<Movimiento> findByUsuario(Usuario usuario);
    List<Movimiento> findByCategoria(Categoria categoria);
}