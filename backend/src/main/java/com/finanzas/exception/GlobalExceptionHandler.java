package com.finanzas.exception;

import com.finanzas.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import jakarta.persistence.EntityNotFoundException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
            HttpStatus.NOT_FOUND.value(),
            HttpStatus.NOT_FOUND.getReasonPhrase(),
            ex.getMessage(),
            request.getDescription(false).substring(4) // Quita "uri=" del path
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleEntityNotFoundException(EntityNotFoundException ex, WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
            HttpStatus.NOT_FOUND.value(),
            HttpStatus.NOT_FOUND.getReasonPhrase(),
            ex.getMessage() != null ? ex.getMessage() : "Recurso no encontrado",
            request.getDescription(false).substring(4)
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CategoriaEnUsoException.class) // Nuevo manejador
    public ResponseEntity<ErrorResponse> handleCategoriaEnUsoException(CategoriaEnUsoException ex, WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
            HttpStatus.CONFLICT.value(), // 409 Conflict
            HttpStatus.CONFLICT.getReasonPhrase(),
            ex.getMessage(),
            request.getDescription(false).substring(4)
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(RuntimeException.class) // Un manejador más genérico para otras RuntimeExceptions
    public ResponseEntity<ErrorResponse> handleGenericRuntimeException(RuntimeException ex, WebRequest request) {
        // Para el caso específico de "Categoría no encontrada" que se estaba lanzando desde el servicio
        if (ex.getMessage() != null && ex.getMessage().startsWith("Categoría no encontrada")) {
            ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                ex.getMessage(),
                request.getDescription(false).substring(4)
            );
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
        
        // Para otras RuntimeExceptions no capturadas específicamente
        ErrorResponse errorResponse = new ErrorResponse(
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
            "Ocurrió un error interno en el servidor.", // Mensaje genérico para no exponer detalles
            request.getDescription(false).substring(4)
        );
        ex.printStackTrace(); // Es buena idea loguear la excepción completa en el servidor
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Puedes añadir más manejadores para excepciones específicas aquí
}
