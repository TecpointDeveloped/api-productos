import pool from './src/config/database.js';

const getData = async (limit = 20) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM stdproducto
      LIMIT $1
    `, [limit]);

    console.log(`\n📊 Vista stdproducto (primeros ${limit} registros)\n`);
    console.log('IDPROD'.padEnd(12) + 'CANTSO');
    console.log('='.repeat(30));

    result.rows.forEach((row) => {
      console.log(
        String(row.idprod || '').padEnd(12) +
        String(row.cantso || '0')
      );
    });

    console.log(`\n✅ Total: ${result.rows.length} registros\n`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

const limit = process.argv[2] || 20;
getData(parseInt(limit));
