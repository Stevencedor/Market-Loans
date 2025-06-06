package com.finanzas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/api/health/db")
    public String checkDbConnection() {
        try {
            jdbcTemplate.execute("SELECT 1");
            return "Conexión a la base de datos: OK";
        } catch (Exception e) {
            return "Error de conexión a la base de datos: " + e.getMessage();
        }
    }
}