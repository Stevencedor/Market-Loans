package com.finanzas.controller;

import com.finanzas.model.Movimiento;
import com.finanzas.model.Reporte;
import com.finanzas.model.Usuario;
import com.finanzas.repository.MovimientoRepository;
import com.finanzas.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/reportes")
public class ReporteController {

    @Autowired
    private MovimientoRepository movimientoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/balance")
    public Reporte obtenerBalance(@RequestParam(required = false) String username, Principal principal) {
        Usuario usuario = null;
        if (username != null) {
            usuario = usuarioRepository.findByUsername(username).orElse(null);
        } else if (principal != null) {
            usuario = usuarioRepository.findByUsername(principal.getName()).orElse(null);
        }
        List<Movimiento> movimientos = usuario != null
                ? movimientoRepository.findByUsuario(usuario)
                : movimientoRepository.findAll();

        double ingresos = movimientos.stream()
                .filter(m -> m.getTipo() == Movimiento.TipoMovimiento.INGRESO)
                .mapToDouble(Movimiento::getMonto)
                .sum();
        double gastos = movimientos.stream()
                .filter(m -> m.getTipo() == Movimiento.TipoMovimiento.GASTO)
                .mapToDouble(Movimiento::getMonto)
                .sum();

        Reporte reporte = new Reporte();
        reporte.setTotalIngresos(ingresos);
        reporte.setTotalGastos(gastos);
        reporte.setBalance(ingresos - gastos);
        return reporte;
    }
}