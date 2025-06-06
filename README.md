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
- [Diseño General](#-diseño-general)
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

## 🎨 Diseño General

El diseño de FinanzasApp ha sido desarrollado siguiendo principios modernos de UI/UX, con enfoque en usabilidad, accesibilidad y responsividad para ofrecer una experiencia intuitiva y agradable al usuario en cualquier dispositivo.

![Dashboard de FinanzasApp](https://via.placeholder.com/800x450?text=Dashboard+FinanzasApp)
![Responsive Design](https://via.placeholder.com/800x450?text=Diseño+Responsivo+FinanzasApp)

> Nota: Reemplazar las imágenes de marcador de posición anteriores con capturas de pantalla reales de la aplicación para mostrar el diseño implementado.

### 🖌️ Sistema de Diseño

#### Paleta de Colores

La paleta de colores de FinanzasApp combina tonos profesionales con matices vibrantes para crear una experiencia visual coherente:

- **Colores primarios**: Tonos de azul (#2c6bed, #5294ff, #0043ba) transmiten confianza y profesionalismo.
- **Colores secundarios**: Púrpura (#6c63ff) aporta personalidad y modernidad.
- **Colores de acento**: Rosa (#ff7b9c) para elementos que requieren atención especial.
- **Colores funcionales**: 
  - Verde (#2ecc71) para ingresos y valores positivos
  - Rojo (#e74c3c) para gastos y valores negativos
- **Colores neutros**: Gradación de tonos desde azul oscuro (#1a1a2e) hasta blanco puro (#ffffff), proporcionando jerarquía visual.

#### Tipografía

- **Fuente principal**: Poppins, una tipografía sans-serif moderna y legible para el contenido general.
- **Fuente de encabezados**: Montserrat, con mayor peso visual para títulos y enfatizar la jerarquía de información.
- **Jerarquía tipográfica**: Sistema escalable desde h1 (2.5rem) hasta texto pequeño (0.85rem), manteniendo proporciones armoniosas.

#### Componentes UI

##### Sistema de Tarjetas
- **Tarjetas estándar**: Contenedores blancos con sombras sutiles y bordes redondeados.
- **Tarjetas especiales**: Variantes con degradados, bordes planos o compactas según la necesidad.
- **Microinteracciones**: Efectos hover con elevación sutil (translateY) y aumento de sombra para mejorar la sensación de interactividad.

##### Botones
- **Jerarquía visual**: Primarios, secundarios, outline, de éxito/peligro.
- **Tamaños adaptables**: Pequeños, medianos y grandes según contexto.
- **Botones con iconos**: Para acciones rápidas e intuitivas.
- **Estados interactivos**: Transiciones suaves en hover y active para mejor feedback.

##### Tablas Responsivas
- **Contenedores deslizables**: Implementación de overflow horizontal en dispositivos pequeños.
- **Encabezados distintivos**: Fondo azul marino sólido (#4a6fa5) con texto blanco.
- **Filas alternadas**: Variación sutil de color para mejor legibilidad.
- **Tratamiento especial**: Fechas con `white-space: nowrap` para evitar quiebres incorrectos.

##### Gráficos y Visualizaciones
- **Aspecto consistente**: Mantenimiento de proporciones adecuadas (`maintainAspectRatio: false`).
- **Responsividad**: Adaptación de etiquetas y tamaños según el viewport.
- **Paleta coherente**: Uso de colores del sistema para categorías y estados.

#### Elementos de Formulario
- **Inputs optimizados**: Diseño limpio con espaciado adecuado y estados de foco visibles.
- **Validación visual**: Indicadores de error y éxito intuitivos.
- **Campos de contraseña**: Implementación de "ojito" para mostrar/ocultar contenido.
- **Selección de fechas**: Componentes nativos mejorados para mejor usabilidad.

### 📱 Enfoque Responsivo

FinanzasApp implementa una estrategia responsiva completa:

1. **Sistema de cuadrícula flexible**: Usando CSS Grid y Flexbox para distribución de elementos.
2. **Media queries estratégicas**: Puntos de quiebre en dispositivos estándar (móvil, tablet, escritorio).
3. **Navbar adaptable**: Menú hamburguesa en dispositivos pequeños, con corrección del comportamiento de cierre.
4. **Elementos proporcionales**: Uso de unidades relativas (rem, %) en lugar de dimensiones fijas.
5. **Tablas responsivas**: Contenedores con desplazamiento horizontal cuando es necesario.
6. **Visualizaciones adaptables**: Gráficos que se ajustan a distintas dimensiones sin distorsión.

### 🌗 Consistencia Visual

El diseño mantiene consistencia a través de:

- **Variables CSS globales**: Sistema de tokens para colores, espaciados, sombras y bordes.
- **Clases utilitarias**: Sistema modular para aplicar márgenes, paddings, alineaciones y estados de texto.
- **Animaciones estandarizadas**: Conjunto predefinido (fadeIn, slideUp, pulse) para comportamientos coherentes.
- **Jerarquía visual**: Encabezados con decoradores gráficos (gradientes) para identificar secciones principales.

### 🚀 Optimizaciones de Usabilidad

- **Carga visual progresiva**: Loaders sutiles durante la obtención de datos.
- **Mensajes de estado claros**: Presentación de errores, éxitos y estados vacíos.
- **Navegación intuitiva**: Estructura lógica y accesible para moverse por la aplicación.
- **Previsualizaciones**: Feedback visual en interacciones como formularios y botones.

### 🧩 Principios de Accesibilidad

- **Contraste adecuado**: Colores que cumplen con ratios de contraste WCAG.
- **Estructura semántica**: Uso apropiado de etiquetas HTML para mejor navegación por lectores de pantalla.
- **Estados focusables**: Todos los elementos interactivos tienen estados de foco visibles.
- **Alternativas textuales**: Para elementos visuales como iconos o gráficos.

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
