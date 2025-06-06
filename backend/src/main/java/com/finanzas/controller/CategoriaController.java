package com.finanzas.controller;

import com.finanzas.model.Categoria;
import com.finanzas.service.CategoriaService;
import com.finanzas.exception.ResourceNotFoundException; // Asegurarse de que se maneja o se deja al GlobalExceptionHandler
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public List<Categoria> listarCategorias() {
        return categoriaService.obtenerTodasLasCategorias();
    }

    @PostMapping
    public ResponseEntity<Categoria> crearCategoria(@RequestBody Categoria categoria) {
        Categoria guardada = categoriaService.guardarCategoria(categoria);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardada);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> obtenerCategoriaPorId(@PathVariable Long id) {
        // Optional<Categoria> categoria = categoriaService.obtenerCategoriaPorId(id);
        // return categoria.map(ResponseEntity::ok)
        //                 .orElseGet(() -> ResponseEntity.notFound().build());
        // Con ResourceNotFoundException, el GlobalExceptionHandler se encargará del 404
        return ResponseEntity.ok(categoriaService.obtenerCategoriaPorId(id)
            .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada con id: " + id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Categoria> actualizarCategoria(@PathVariable Long id, @RequestBody Categoria categoriaActualizada) {
        // El servicio ya lanza ResourceNotFoundException si no se encuentra la categoría.
        // GlobalExceptionHandler lo convertirá en un 404 con cuerpo JSON.
        Categoria actualizada = categoriaService.actualizarCategoria(id, categoriaActualizada);
        return ResponseEntity.ok(actualizada);
        // Ya no es necesario el try-catch aquí para ResourceNotFoundException
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCategoria(@PathVariable Long id) {
        // El servicio ya lanza ResourceNotFoundException si no se encuentra la categoría.
        // GlobalExceptionHandler lo convertirá en un 404 con cuerpo JSON.
        categoriaService.eliminarCategoria(id);
        return ResponseEntity.noContent().build(); 
        // Ya no es necesario el try-catch aquí para ResourceNotFoundException
    }
}