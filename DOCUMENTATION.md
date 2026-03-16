# Documentación Técnica - Proyecto OPA Fintech

## 1. Visión General del Proyecto
**OPA** es una aplicación Fintech diseñada para **Agentes y Operadores**. Su objetivo principal es proporcionar un panel de control centralizado (Dashboard) para la gestión de transacciones financieras, visualización de métricas operativas (KPIs), administración de redes de afiliados (Árbol de Agentes) y acceso a soporte.

El sistema se enfoca en una experiencia de usuario **minimalista**, con una estética de marca fuerte basada en degradados azules y una tipografía jerarquizada.

---

## 2. Stack Tecnológico
*   **Frontend:** React (Vite)
*   **Estilos:** Tailwind CSS v4
*   **Lenguaje:** TypeScript
*   **Gráficos:** Recharts (para visualización de datos)
*   **Iconografía:** Lucide React + Assets SVG importados de Figma
*   **Animaciones:** Framer Motion (Motion)
*   **Enrutamiento:** React Router (implícito en la estructura de navegación)

---

## 3. Sistema de Diseño (Design System)

La aplicación sigue guías de estilo estrictas para mantener la consistencia de marca:

### 3.1 Tipografía
*   **Títulos y Encabezados:** `Montserrat` (Generalmente en mayúsculas, Bold).
*   **Cuerpo y Textos:** `Poppins` (Regular, Medium, SemiBold).

### 3.2 Colores Principales
*   **Fondo Principal:** Tonos claros/blancos para áreas de contenido.
*   **Acentos de Marca:**
    *   Azul Oscuro (Navy): `#001c3e` (Barra lateral, Tarjetas principales).
    *   Azul Cian (Highlight): `#00b7e3` (Botones de acción, Badges, Elementos activos).
    *   Gradientes: Uso extensivo de degradados lineales azules en tarjetas y fondos.

### 3.3 Layout y Espaciado
*   **Márgenes Laterales:** `px-6` estricto en contenedores principales para alineación perfecta.
*   **Scroll:** Barras de desplazamiento ocultas (`scrollbar-hide`) para una estética limpia.
*   **Bordes:** Redondeados suaves (`rounded-lg`, `rounded-[14px]`, `rounded-[16px]`).
*   **Sombras:** Sombras suaves y difusas para profundidad (ej. en iconos de reportes).

---

## 4. Arquitectura y Módulos Principales

### 4.1 Dashboard (Panel Principal)
El núcleo de la aplicación. Agrega la información más crítica para el operador.
*   **Header:** Bienvenida y acceso rápido al perfil.
*   **KPI Cards:** Tarjetas de métricas clave (Saldo, Ganancias, Transacciones).
*   **Quick Recharge (Recargas Rápidas):** Accesos directos para realizar operaciones frecuentes sin navegar.
*   **Mapa Operacional:** Visualización geográfica o lógica de la operación.

### 4.2 Reportes Avanzados (`Reports.tsx`)
Módulo analítico robusto que permite al usuario visualizar el rendimiento financiero.
*   **Selector de Reportes (Grid):**
    1.  **Comisiones:** Ingresos por ventas.
    2.  **Movimientos:** Historial general.
    3.  **Comisiones/Árbol:** Ganancias derivadas de la red de agentes.
    4.  **Transacciones de Cupo:** Gestión de límites.
    5.  **Apuesta de Afiliados:** Métricas específicas del sector apuestas.
    6.  **Comprobantes Bancarios:** Gestión de depósitos y vouchers.
*   **Detalle de Reporte:** Al seleccionar una tarjeta, se abre una vista detallada con:
    *   Gráficos de barras (`Recharts`).
    *   Resumen de estadísticas (Total, Promedio, Tasa de éxito).
    *   Tablas de transacciones con filtros de fecha (7, 30, 90 días).
    *   Exportación (PDF/Excel).

### 4.3 Soporte (`Support.tsx`)
Centro de ayuda para el usuario.
*   **Tarjeta de Bienvenida:** Saludo personalizado y CTA principal ("¿En qué podemos ayudarte?").
*   **Sistema de Pestañas (Tabs):**
    *   *Preguntas frecuentes:* Lista de accesos directos y novedades.
    *   *Mensajes:* Buzón de entrada (simulado).
    *   *Desactivado:* Estado de cuenta o servicios inactivos.
*   **Accesos Rápidos (Links):** Lista estilizada para acciones comunes:
    *   Métodos de Recarga.
    *   Ver Estado de Retiro (Resaltado en Azul).
    *   Anular Retiro.
    *   Historiales (Apuestas/Transacciones).
    *   Configuración.

### 4.4 Árbol de Agentes
(Mencionado en referencias) Módulo para visualizar la jerarquía de la red de afiliados, permitiendo ver quién está debajo de quién y las comisiones generadas por la red.

---

## 5. Flujo de Usuario (User Flow)

1.  **Inicio de Sesión:** (Implícito) El usuario accede como "Operador" o "Agente".
2.  **Navegación Principal:**
    *   El usuario aterriza en el **Dashboard**.
    *   Desde la **Sidebar**, navega a las secciones principales (Reportes, Soporte, Agentes).
3.  **Flujo de Operación (Ejemplo: Ver una comisión):**
    *   Dashboard -> Click en "Reportes Avanzados" -> Selecciona "Comisiones" -> Visualiza Gráfico -> Filtra por "Últimos 30 días".
4.  **Flujo de Ayuda:**
    *   Dashboard -> Click en "Soporte" -> Escribe en el buscador o selecciona "Ver estado de mi retiro".

---

## 6. Componentes Reutilizables (UI Kit)

La aplicación utiliza una arquitectura de componentes basada en `shadcn/ui` modificada:
*   **Card:** Contenedor base con bordes y sombras definidos.
*   **Badge:** Indicadores de estado (Nuevo, Éxito, Pendiente).
*   **Input:** Campos de texto estilizados con iconos (Search).
*   **Button:** Botones primarios (Azul/Cian) y secundarios.
*   **Icons:** Sistema híbrido usando `lucide-react` para iconos utilitarios y SVGs importados de Figma (`figma:asset`) para ilustraciones ricas (3D).

---

## 7. Manejo de Datos

Actualmente, la aplicación opera en modo **Frontend**, utilizando datos simulados (mock data) dentro de los componentes para propósitos de demostración y desarrollo de UI.
*   **Tipos de Datos:** Interfaces TypeScript definidas (`Transaction`, `ReportItem`, `Voucher`).
*   **Estado:** Uso de `useState` local para manejo de pestañas, filtros de fecha y selecciones de reportes.

---

## 8. Modales y Popups
*   **Detalle del Mapa Operacional:** Modal que muestra información específica de una zona o punto operativo con acciones rápidas (Recargar, Mensaje, Reportar).
*   **Descargas:** Alertas/Modales para confirmación de descarga de reportes (PDF/Excel).

---

## 9. Próximos Pasos (Pendientes/Mejoras)
*   Integración con Backend (Supabase/API) para datos reales.
*   Implementación completa del flujo de "Mensajes" en Soporte.
*   Conexión de los formularios de "Recarga Rápida" con pasarelas de pago reales.
