import pool from '../config/database.js';

export const testDatabaseConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Conexión a PostgreSQL exitosa');
    console.log('Hora del servidor:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('❌ Error al conectar a PostgreSQL:', error.message);
    return false;
  }
};

export const closeConnection = async () => {
  try {
    await pool.end();
    console.log('✅ Conexión cerrada correctamente');
  } catch (error) {
    console.error('❌ Error al cerrar la conexión:', error.message);
  }
};
