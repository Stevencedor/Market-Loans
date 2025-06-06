package com.finanzas.controller;

import com.finanzas.model.Movimiento;
import com.finanzas.model.Usuario;
import com.finanzas.repository.MovimientoRepository;
import com.finanzas.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/movimientos")
public class MovimientoController {

    @Autowired
    private MovimientoRepository movimientoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Movimiento> listarMovimientos(@RequestParam(required = false) String username) {
        if (username != null) {
            Usuario usuario = usuarioRepository.findByUsername(username).orElse(null);
            if (usuario != null) {
                return movimientoRepository.findByUsuario(usuario);
            }
        }
        return movimientoRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> crearMovimiento(@RequestBody Movimiento movimiento, Principal principal) {
        if (principal != null) {
            Usuario usuario = usuarioRepository.findByUsername(principal.getName()).orElse(null);
            if (usuario != null) {
                movimiento.setUsuario(usuario);
            }
        }
        Movimiento guardado = movimientoRepository.save(movimiento);
        return ResponseEntity.ok(guardado);
    }
}