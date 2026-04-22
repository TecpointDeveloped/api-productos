import express from 'express';
import dotenv from 'dotenv';
import { testDatabaseConnection } from './src/utils/testConnection.js';
import productRoutes from './src/routes/productRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de prueba
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API funcionando correctamente',
    estado: 'online',
    version: '1.0.0',
    endpoints: {
      productos: '/api/products',
      buscarPorSerie: '/api/products/serie/:ite_serie'
    }
  });
});

// Rutas de la API
app.use('/api/products', productRoutes);

// Iniciar servidor - Solo en desarrollo local
if (process.env.NODE_ENV !== 'production') {
  const startServer = async () => {
    try {
      console.log('🔄 Verificando conexión a la base de datos...\n');
      const connectionSuccess = await testDatabaseConnection();

      if (connectionSuccess) {
        app.listen(PORT, () => {
          console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
          console.log(`📝 Modo: ${process.env.NODE_ENV}`);
        });
      } else {
        console.error('\n⚠️  No se puede iniciar el servidor sin conexión a la BD');
        process.exit(1);
      }
    } catch (error) {
      console.error('Error al iniciar el servidor:', error);
      process.exit(1);
    }
  };

  startServer();
}

// Exportar para Vercel
export default app;

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  console.error('Error no manejado:', err);
  if (process.env.NODE_ENV !== 'production') {
    process.exit(1);
  }
});
