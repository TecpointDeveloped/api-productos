import pool from './src/config/database.js';

const getTables = async () => {
  try {
    const result = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

    console.log('\n📊 Tablas en dbeliezer:\n');

    if (result.rows.length === 0) {
      console.log('⚠️  No hay tablas en la base de datos');
    } else {
      result.rows.forEach((row, i) => {
        console.log(`${i + 1}. ${row.table_name}`);
      });
    }

    console.log('\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

getTables();
