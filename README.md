# Sistema de Turnos para Veterinaria

  
## Descripción General

Este proyecto consiste en un sistema de gestión de turnos diseñado para veterinarias, que permite la administración de usuarios, mascotas, servicios, y turnos de manera eficiente y moderna. Construido frontend en **React**.

  
## Funcionalidades Clave

  

### 1. Gestión de Usuarios

-  **Roles:**

- Administrador

- Veterinario

- Cliente

-  **Características:**

- Registro de usuarios y autenticación con JWT.

- Cada cliente puede registrar y gestionar información de sus mascotas.

  

### 2. Gestión de Mascotas

- CRUD de mascotas asociado a cada cliente.

- Registro de datos importantes:

- Especie

- Raza

- Edad

- Historial médico

- Vacunas

  

### 3. Gestión de Servicios

- CRUD de servicios ofrecidos por la veterinaria:

- Consulta médica

- Vacunación

- Baño y peluquería

- Emergencias

- Configuración de horarios disponibles para cada servicio.

  

### 4. Gestión de Turnos

- Reservar turnos para una mascota específica.

- Selección de:

- Servicio

- Veterinario (opcional)

- Fecha y horario disponible

- Gestión de estados del turno:

- RESERVADO

- CANCELADO

- FINALIZADO

- Notificaciones por correo o SMS (opcional).

  

### 5. Panel Administrativo

- Herramientas para:

- Gestión de veterinarios

- Configuración de horarios

- Gestión de turnos

- Administración de clientes

- Reportes y estadísticas:

- Servicios más solicitados

- Historial de turnos

  

### 6. Historial Médico

- Registro de consultas y tratamientos pasados para cada mascota.

- Posibilidad de adjuntar:

- Notas

- Tratamientos

- Recetas médicas

  

  

## Instalación y Configuración

  

1.  **Clonar el repositorio:**

```bash

git clone <https://github.com/FedeHerrera10/vetapp-frontend>

```

  

2.  **Ejecucion:**

 Descargar todas las dependencias y ejecutar el proyecto.

```bash
 pnpm install

 pnpm run dev

```
