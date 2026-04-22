import pool from '../src/config/database.js';

console.log('🔄 Intentando conectar a PostgreSQL...\n');
console.log('Detalles de conexión:');
console.log('- Host:', process.env.DB_HOST);
console.log('- Puerto:', process.env.DB_PORT);
console.log('- Usuario:', process.env.DB_USER);
console.log('- Base de datos:', process.env.DB_NAME);
console.log('\n');

try {
  const result = await pool.query('SELECT NOW()');
  console.log('✅ ¡Conexión EXITOSA!');
  console.log('Hora del servidor:', result.rows[0].now);
  process.exit(0);
} catch (error) {
  console.error('❌ Error de conexión:');
  console.error('Código:', error.code);
  console.error('Mensaje:', error.message);
  process.exit(1);
} finally {
  await pool.end();
}
