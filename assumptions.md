# Assumptions

1. **Entorno Local:** Se asume que el evaluador tiene Node.js (v18 o superior) instalado.
2. **Persistencia:** La base de datos es un archivo SQLite local (`dev.db`). Si se borra, los datos se pierden.
3. **Conexión:** Aunque se simula una API, la base de datos es la fuente de la verdad para la UI.
4. **Next.js 15:** Se utiliza el App Router y Server Actions para las mutaciones de datos.