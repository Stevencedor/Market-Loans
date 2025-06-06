# 💰 FinanzasApp - Gestión Personal de Finanzas

![FinanzasApp Logo](https://img.shields.io/badge/FinanzasApp-v1.0-blue)
![Angular](https://img.shields.io/badge/Angular-v20.0.1-red)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-v3.2.0-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

> Una aplicación web moderna para la gestión integral de finanzas personales, que permite el seguimiento de ingresos, gastos, categorías y análisis de datos financieros a través de gráficos intuitivos y reportes detallados.

![Dashboard Preview](https://via.placeholder.com/800x400?text=FinanzasApp+Dashboard)

## 📋 Contenido

- [Características](#-características)
- [Arquitectura](#-arquitectura)
- [Requisitos previos](#-requisitos-previos)
- [Instalación y configuración](#-instalación-y-configuración)
- [Ejecución](#-ejecución)
- [Funcionalidades detalladas](#-funcionalidades-detalladas)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Tecnologías utilizadas](#-tecnologías-utilizadas)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

## ✨ Características

- **Dashboard financiero interactivo** con resumen de balance actual
- **Visualización gráfica** de distribución de gastos por categoría
- **Análisis de tendencias temporales** de ingresos y gastos
- **Gestión completa de movimientos** (ingresos y gastos)
- **Categorización personalizable** de transacciones financieras
- **Filtrado por fechas** para análisis de periodos específicos
- **Sistema de autenticación seguro** con JWT
- **Interfaz responsiva** adaptada a dispositivos móviles y de escritorio

## 🏗️ Arquitectura

FinanzasApp implementa una arquitectura cliente-servidor moderna:

```
                         ┌─────────────────┐
                         │                 │
                         │   Cliente Web   │
                         │    (Angular)    │
                         │                 │
                         └────────┬────────┘
                                  │
                                  │ HTTP/JSON
                                  │
                         ┌────────▼────────┐
                         │                 │
                         │  API RESTful    │
                         │  (Spring Boot)  │
                         │                 │
                         └────────┬────────┘
                                  │
                                  │
                         ┌────────▼────────┐
                         │                 │
                         │  Base de Datos  │
                         │     (MySQL)     │
                         │                 │
                         └─────────────────┘
```

- **Frontend**: Aplicación SPA desarrollada con Angular 20, enfocada en la experiencia de usuario y la visualización de datos financieros.
- **Backend**: API RESTful desarrollada con Spring Boot que gestiona la lógica de negocio, autenticación y manipulación de datos.
- **Base de datos**: MySQL para el almacenamiento persistente de datos.

## 🔧 Requisitos previos

Para ejecutar este proyecto necesitarás:

- **Java 17** o superior
- **Node.js 18** o superior y npm
- **MySQL 8** o superior
- **Maven 3.8** o superior
- **Angular CLI 20** o superior

## 🚀 Instalación y configuración

### 1. Clonar el repositorio

```powershell
git clone https://github.com/tu-usuario/finanzas-app.git
cd finanzas-app
```

### 2. Configurar el Backend

1. Crear la base de datos en MySQL:

```sql
CREATE DATABASE finanzas_db;
```

2. Configurar las variables de entorno:

```powershell
# Copiar el archivo de ejemplo
Copy-Item .\backend\.env.example .\backend\.env

# Editar el archivo con tus configuraciones
notepad .\backend\.env
```

3. Instalar dependencias:

```powershell
cd backend
mvn clean install
```

### 3. Configurar el Frontend

```powershell
cd frontend
npm install
```

## ▶️ Ejecución

### Backend

```powershell
cd backend
mvn spring-boot:run
```

El backend estará disponible en `http://localhost:8080`.

### Frontend

```powershell
cd frontend
ng serve
```

La aplicación estará disponible en `http://localhost:4200`.

## 🔍 Funcionalidades detalladas

### 1. Sistema de autenticación

- Registro de usuarios
- Inicio de sesión seguro con JWT
- Cierre de sesión

### 2. Dashboard Financiero

- Resumen de balance actual (ingresos vs gastos)
- Gráfico circular de distribución de gastos por categoría
- Gráfico de líneas para tendencias temporales 
- Filtrado por fechas personalizable

### 3. Gestión de Movimientos

- Registro de ingresos y gastos
- Categorización de movimientos
- Listado con filtros y ordenación

### 4. Gestión de Categorías

- Creación de categorías personalizadas
- Edición y eliminación de categorías
- Asignación de categorías a movimientos

## 📁 Estructura del proyecto

### Backend (Spring Boot)

```
backend/
├── src/main/java/com/finanzas/
│   ├── config/               # Configuraciones (CORS, seguridad)
│   ├── controller/           # Controladores REST
│   ├── model/                # Entidades JPA
│   ├── repository/           # Repositorios JPA
│   └── service/              # Servicios de lógica de negocio
├── src/main/resources/
│   └── application.properties # Configuración principal
└── pom.xml                   # Dependencias Maven
```

### Frontend (Angular)

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/       # Componentes reutilizables
│   │   ├── guards/           # Guards de autenticación
│   │   ├── pages/            # Páginas principales
│   │   └── services/         # Servicios de API y autenticación
│   ├── assets/               # Imágenes y recursos estáticos
│   └── environments/         # Configuraciones por entorno
└── angular.json              # Configuración de Angular
```

## 💻 Tecnologías utilizadas

### Backend
- **Spring Boot**: Framework de desarrollo para Java
- **Spring Security**: Gestión de autenticación y autorización
- **Spring Data JPA**: Mapeo objeto-relacional para MySQL
- **JWT**: Autenticación basada en tokens
- **Maven**: Gestión de dependencias

### Frontend
- **Angular**: Framework de desarrollo frontend
- **Chart.js**: Biblioteca para visualización de datos
- **ng2-charts**: Integración de Chart.js con Angular
- **date-fns**: Manipulación de fechas
- **Bootstrap** (opcional): Framework CSS para diseño responsivo

## 👥 Contribución

Las contribuciones son bienvenidas. Para contribuir:

1. Haz un fork del proyecto
2. Crea una rama para tu funcionalidad (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Empuja a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

Desarrollado como proyecto final del curso de Construcción de Software, Universidad de La Salle, 2025.
