package com.finanzas.controller;

import com.finanzas.model.Usuario;
import com.finanzas.repository.UsuarioRepository;
import com.finanzas.service.ReportesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/reportes")
public class ReportesController {

    @Autowired
    private ReportesService reportesService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/balance")
    public ResponseEntity<Map<String, Object>> getBalance(
            Principal principal,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin) {

        Usuario usuario = usuarioRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + principal.getName()));

        Map<String, Object> balance;
        if (fechaInicio != null && fechaFin != null) {
            balance = reportesService.getBalancePorFechas(usuario, fechaInicio, fechaFin);
        } else {
            // Lógica para balance general si no hay fechas (similar a lo que hacía ReporteController)
            balance = reportesService.getBalanceGeneral(usuario);
        }
        return ResponseEntity.ok(balance);
    }
}
