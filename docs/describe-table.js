import pool from '../src/config/database.js';

const describeTable = async (tableName) => {
  try {
    const result = await pool.query(`
      SELECT
        column_name,
        data_type,
        is_nullable,
        column_default
      FROM information_schema.columns
      WHERE table_name = $1
      ORDER BY ordinal_position
    `, [tableName]);

    if (result.rows.length === 0) {
      console.log(`\n❌ Tabla "${tableName}" no encontrada\n`);
      process.exit(1);
    }

    console.log(`\n📋 Estructura de tabla: ${tableName}\n`);
    console.log('COLUMNA'.padEnd(30) + 'TIPO'.padEnd(20) + 'NULLABLE');
    console.log('='.repeat(75));

    result.rows.forEach((col) => {
      const nullable = col.is_nullable === 'YES' ? 'SÍ' : 'NO';
      console.log(
        col.column_name.padEnd(30) +
        col.data_type.padEnd(20) +
        nullable
      );
    });

    console.log('\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

const table = process.argv[2] || 'items';
describeTable(table);
