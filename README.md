# API RESTful con Node.js, Express y PostgreSQL

Proyecto de API desarrollado siguiendo principios de Clean Code.

## 📁 Estructura del Proyecto

```
src/
├── config/          # Configuraciones (BD, env, etc)
├── controllers/     # Lógica de negocio
├── routes/          # Definición de rutas
├── models/          # Modelos de datos
├── middleware/      # Middlewares personalizados
└── utils/           # Funciones utilitarias
tests/               # Pruebas unitarias
index.js             # Punto de entrada
```

## 🚀 Instalación

1. **Clonar o descargar el proyecto**

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno (.env):**
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=tu_basedatos
NODE_ENV=development
PORT=3000
```

4. **Asegurar que PostgreSQL esté corriendo**

5. **Iniciar el servidor:**
```bash
# Desarrollo (con reinicio automático)
npm run dev

# Producción
npm start
```

## 🧪 Pruebas

Para ejecutar las pruebas:
```bash
npm test
```

## 📚 Dependencias

- **express**: Framework web
- **pg**: Driver de PostgreSQL
- **axios**: Cliente HTTP
- **dotenv**: Gestión de variables de entorno

## ✅ Próximos pasos

- [ ] Crear modelos de datos
- [ ] Implementar controladores
- [ ] Configurar rutas
- [ ] Agregar middlewares
- [ ] Implementar autenticación
