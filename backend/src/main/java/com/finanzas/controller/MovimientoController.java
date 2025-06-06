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
    public List<Movimiento> listarMovimientos(Principal principal) { // Modificado para usar Principal
        if (principal != null) {
            Usuario usuario = usuarioRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + principal.getName()));
            return movimientoRepository.findByUsuario(usuario);
        }
        // Considerar qué devolver si no hay principal. Podría ser una lista vacía o un error.
        // Por ahora, devolvemos una lista vacía si no hay un usuario autenticado.
        return List.of(); 
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