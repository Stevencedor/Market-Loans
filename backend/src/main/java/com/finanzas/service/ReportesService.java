package com.finanzas.service;

import com.finanzas.model.Movimiento;
import com.finanzas.model.Usuario;
import com.finanzas.repository.MovimientoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportesService {

    @Autowired
    private MovimientoRepository movimientoRepository;

    public Map<String, Object> getBalancePorFechas(Usuario usuario, LocalDate fechaInicio, LocalDate fechaFin) {
        LocalDateTime inicio = fechaInicio.atStartOfDay();
        LocalDateTime fin = fechaFin.atTime(LocalTime.MAX);

        List<Movimiento> movimientos = movimientoRepository.findByUsuarioAndFechaBetween(usuario, inicio, fin);

        double totalIngresos = movimientos.stream()
                .filter(m -> m.getTipo() == Movimiento.TipoMovimiento.INGRESO)
                .mapToDouble(Movimiento::getMonto)
                .sum();

        double totalGastos = movimientos.stream()
                .filter(m -> m.getTipo() == Movimiento.TipoMovimiento.GASTO)
                .mapToDouble(Movimiento::getMonto)
                .sum();

        Map<String, Object> balance = new HashMap<>();
        balance.put("totalIngresos", totalIngresos);
        balance.put("totalGastos", totalGastos);
        balance.put("balance", totalIngresos - totalGastos);
        balance.put("movimientos", movimientos); // Opcional: devolver también los movimientos filtrados

        return balance;
    }

    public Map<String, Object> getBalanceGeneral(Usuario usuario) {
        List<Movimiento> movimientos = movimientoRepository.findByUsuario(usuario);

        double totalIngresos = movimientos.stream()
                .filter(m -> m.getTipo() == Movimiento.TipoMovimiento.INGRESO)
                .mapToDouble(Movimiento::getMonto)
                .sum();

        double totalGastos = movimientos.stream()
                .filter(m -> m.getTipo() == Movimiento.TipoMovimiento.GASTO)
                .mapToDouble(Movimiento::getMonto)
                .sum();

        Map<String, Object> balance = new HashMap<>();
        balance.put("totalIngresos", totalIngresos);
        balance.put("totalGastos", totalGastos);
        balance.put("balance", totalIngresos - totalGastos);
        // No incluimos la lista completa de movimientos aquí para el balance general,
        // a menos que sea un requisito específico.
        return balance;
    }
}
