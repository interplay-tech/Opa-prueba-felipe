# OPA Operator Backlog (Hondubet Honduras)

## Objetivo
Construir una consola operativa para concesionarios y subconcesionarios que administre red de agentes, riesgo y operaciones financieras con trazabilidad auditable.

## Principios de producto
- Operación primero: cada pantalla debe habilitar una decisión o una acción.
- Estado y SLA visibles: todo caso operativo debe tener estado, responsable y vencimiento.
- Trazabilidad total: cambios críticos con motivo, usuario y timestamp.
- Jerarquía real: concesionario > subconcesionario > agente > terminal/punto.

## V1 (Prioridad alta)

### 1) Centro de Operaciones (Dashboard accionable)
- Cola operativa unificada: retiros pendientes, comprobantes observados, agentes en alerta.
- Mapa funcional: click en nodo abre detalle con acciones y navegación a ficha.
- KPI de turno: disponible red, retiros pendientes, alertas activas, terminales caídas.
- Criterio de aceptación:
  - Se puede abrir y ejecutar acción en un caso desde dashboard.
  - Se visualiza estado y responsable del caso.

### 2) Flujo de Retiros (máquina de estados)
- Estados mínimos:
  - `SOLICITADO`, `EN_REVISION`, `APROBADO`, `RECHAZADO`, `ANULADO`, `PAGADO`
- Reglas:
  - Solo `SOLICITADO` se puede anular sin escalamiento.
  - `EN_REVISION` requiere comentario y responsable.
  - Cualquier cambio genera evento de auditoría.
- Criterio de aceptación:
  - Operador ejecuta transición válida desde UI.
  - Se bloquean transiciones inválidas.

### 3) Árbol de agentes operativo
- Filtros por estado + búsqueda por código/nombre/ubicación.
- Drill-down por subconcesionario y ficha de agente.
- Acciones por nodo: recargar, pausar, escalar a soporte.
- Criterio de aceptación:
  - En menos de 2 clicks se llega del nodo al detalle operativo.

### 4) Soporte orientado a operación
- Reemplazar enfoque FAQ final-user por:
  - Tickets abiertos
  - Escalamientos
  - Base operativa (playbooks)
- Criterio de aceptación:
  - Cada ticket muestra prioridad, SLA y estado.

### 5) Reportes de decisión
- Plantillas con filtros útiles para operador:
  - Retiros en riesgo
  - Conciliación de comprobantes
  - Comisiones por nivel
- Criterio de aceptación:
  - Cada reporte tiene al menos una acción siguiente sugerida.

## V2 (Prioridad media)

### 6) Motor de alertas y umbrales
- Umbrales por jerarquía (saldo, cupo, volumen atípico).
- Notificaciones por criticidad y canal.

### 7) Control de permisos por rol
- Roles:
  - Operador senior
  - Operador estándar
  - Auditor
- Matriz CRUD por módulo y por acción crítica.

### 8) Conciliación financiera
- Bandeja de comprobantes con validación y diferencias.
- Flujo de aprobación dual para montos altos.

### 9) Perfil de operador con contexto operativo
- Sustituir datos no operativos por:
  - Centro/región asignada
  - Ventana de operación
  - Último acceso
  - Permisos efectivos

## V3 (Prioridad estratégica)

### 10) Automatización inteligente
- Recomendaciones de acción por patrón de riesgo.
- Enrutamiento automático de tickets por tipo/urgencia.

### 11) Score de salud de red
- Índice compuesto por liquidez, cumplimiento SLA, incidentes y disponibilidad.

### 12) Integración de auditoría y cumplimiento
- Exportes regulatorios y bitácora inmutable de eventos críticos.

## KPIs clave por rol operador
- Tiempo medio de resolución (MTTR) por incidente.
- % de retiros dentro de SLA.
- % de comprobantes conciliados sin observación.
- Agentes en alerta por cada 100 agentes activos.
- Variación neta de saldo de red por día.

## Riesgos de producto a evitar
- Mezclar flujos de usuario final con flujos de operador.
- UI bonita sin acciones reales sobre casos.
- Métricas sin responsable ni trazabilidad.
