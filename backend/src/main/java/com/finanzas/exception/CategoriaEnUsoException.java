package com.finanzas.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class CategoriaEnUsoException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public CategoriaEnUsoException(String message) {
        super(message);
    }
}
