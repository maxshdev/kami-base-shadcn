# 📝 Naming & Code Conventions

Este documento define las convenciones de nombres y estilos de código utilizadas en este proyecto.  
El objetivo es mantener **consistencia, claridad y escalabilidad** en todo el código.

---

## 📌 1. Componentes React
- Los componentes siempre en **PascalCase**.
- Los archivos que exportan un componente principal también deben llamarse en PascalCase.

Ejemplos:
- CrudPage.tsx
- DynamicForm.tsx
- UserCard.tsx

Uso en JSX:
<CrudPage />
<DynamicForm />
<UserCard />

---

## 📌 2. Hooks & Funciones
- Los hooks deben comenzar con `use` y escribirse en **camelCase**.
- Helpers y funciones utilitarias también en camelCase.

Ejemplos:
- useCrud.ts
- useAuth.ts
- getActionsColumn.ts
- formatDate.ts

---

## 📌 3. Archivos de Infraestructura / Módulos
- Usar **kebab-case** para archivos que no representan componentes React.
- Incluye: tipos, hooks, configuración, servicios, utilidades.

Ejemplos:
- crud.types.ts
- common-columns.tsx
- auth-provider.tsx
- api-client.ts

---

## 📌 4. Constantes y Enums
- Constantes globales en **UPPER_CASE**.
- Enums en PascalCase con miembros en PascalCase.

Ejemplo:
API_BASE_URL = "https://api.example.com"

enum UserRole {
  Admin,
  Editor,
  Viewer
}

---

## 📌 5. Nombres en Bases de Datos / APIs Externas
- Si la API o la base de datos utiliza `snake_case`, se mantiene tal cual para evitar inconsistencias.
- En el frontend se recomienda mapear a `camelCase` cuando sea posible.

Ejemplo de dato externo:
{
  "user_id": "123",
  "first_name": "Max"
}

Mapeado en frontend:
{
  "userId": "123",
  "firstName": "Max"
}

---

## 📌 6. Carpetas
- Carpetas en **kebab-case**.
- Evitar mayúsculas en nombres de carpetas.

Ejemplo:
src/core/crud/
src/features/user/
src/components/forms/
src/common/columns/

---

## 📌 7. Resumen Rápido
- PascalCase → componentes (CrudPage, DynamicForm)  
- camelCase → hooks, funciones (useCrud, getActionsColumn)  
- kebab-case → archivos/módulos (crud.types.ts, common-columns.tsx)  
- UPPER_CASE → constantes y enums (API_BASE_URL, UserRole)  
- snake_case → solo en datos externos (DB/API)  

---

✔ Mantener estas convenciones asegura un código más **legible, consistente y fácil de mantener**.
