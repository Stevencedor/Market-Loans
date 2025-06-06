package com.finanzas.service;

import com.finanzas.model.Categoria;
import com.finanzas.model.Movimiento;
import com.finanzas.repository.CategoriaRepository;
import com.finanzas.repository.MovimientoRepository;
import com.finanzas.exception.ResourceNotFoundException;
import com.finanzas.exception.CategoriaEnUsoException; // Importar nueva excepción
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private MovimientoRepository movimientoRepository; // Inyectar MovimientoRepository

    @Transactional(readOnly = true)
    public List<Categoria> obtenerTodasLasCategorias() {
        return categoriaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Categoria> obtenerCategoriaPorId(Long id) {
        return categoriaRepository.findById(id);
    }

    @Transactional
    public Categoria guardarCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    @Transactional
    public Categoria actualizarCategoria(Long id, Categoria categoriaActualizada) {
        return categoriaRepository.findById(id).map(categoriaExistente -> {
            categoriaExistente.setNombre(categoriaActualizada.getNombre());
            categoriaExistente.setDescripcion(categoriaActualizada.getDescripcion());
            return categoriaRepository.save(categoriaExistente);
        }).orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada con id: " + id));
    }

    @Transactional
    public void eliminarCategoria(Long id) {
        Categoria categoria = categoriaRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada con id: " + id));

        // Verificar si la categoría está en uso por algún movimiento
        List<Movimiento> movimientosConCategoria = movimientoRepository.findByCategoria(categoria);
        if (!movimientosConCategoria.isEmpty()) {
            throw new CategoriaEnUsoException("No se puede eliminar la categoría porque está asignada a " + movimientosConCategoria.size() + " movimiento(s).");
        }

        categoriaRepository.deleteById(id);
    }
}
