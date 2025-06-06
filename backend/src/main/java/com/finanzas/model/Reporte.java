package com.finanzas.model;

import lombok.Data;

@Data
public class Reporte {
    private Double totalIngresos;
    private Double totalGastos;
    private Double balance;
}