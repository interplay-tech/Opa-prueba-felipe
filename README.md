# OPA Fintech Frontend

Proyecto React + TypeScript + Tailwind v4 con Storybook para construir el SaaS mobile-first de OPA.

## Stack

- React + Vite
- TypeScript
- Tailwind CSS v4
- React Router
- Recharts
- Framer Motion
- Storybook (UI Kit)

## Comandos

```bash
npm install
npm run dev
```

Storybook:

```bash
npm run storybook
```

Build produccion:

```bash
npm run build
npm run build-storybook
```

## Estructura

- `src/components/ui`: componentes base reutilizables
- `src/components/layout`: shell mobile y navegacion inferior
- `src/components/mobile`: bloques visuales del dashboard mobile
- `src/components/agents`: modal y piezas de detalle de agente
- `src/components/modules`: scaffold de pantallas operativas
- `src/pages`: pantallas principales (`/login`, `/dashboard`, `/reports`, `/agents`, `/support`)
- `src/pages/modules`: modulos operativos (recargas, retiros, historiales, configuracion)
- `src/stories`: historias de Storybook para UI base y componentes mobile
- `src/data/opa.ts`: datos mock alineados al diseno
- `OPA_PRODUCT_BLUEPRINT.md`: mapa funcional y logica del producto

## Nodos Figma usados

Implementacion basada en Figma MCP con estos nodos:

- `74:458` (Login)
- `124:127` (Dashboard principal)
- `162:648` (Patron de reportes/agentes)
- `162:1050` (Modal detalle de agente)

Link raiz:

`https://www.figma.com/design/RWWg57y1bW5KIjtPm83vXo/OPA?node-id=74-83`
