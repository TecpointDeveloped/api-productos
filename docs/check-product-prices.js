import pool from '../src/config/database.js';

const checkPrices = async (ite_pk) => {
  try {
    console.log(`\n🔍 Buscando precios para producto ID: ${ite_pk}\n`);

    // 1. Verificar en precioventas
    const pv = await pool.query(
      'SELECT * FROM precioventas WHERE pre_prodfk = $1 LIMIT 1',
      [ite_pk]
    );

    console.log('📊 precioventas:', pv.rows.length > 0 ? pv.rows[0] : 'NO ENCONTRADO');

    // 2. Verificar en tprecios
    const tp = await pool.query(
      'SELECT * FROM tprecios LIMIT 5'
    );

    console.log('\n📋 Primeros registros en tprecios:');
    tp.rows.forEach(row => {
      console.log(`  - ${row.tpre_pk}: ${row.tpre_descripcion} (${row.tpre_porcentaje}%)`);
    });

    // 3. Verificar en vcrossprecios si existe
    const vc = await pool.query(
      'SELECT * FROM vcrossprecios WHERE idprod = $1 LIMIT 1',
      [ite_pk]
    );

    console.log('\n📈 vcrossprecios:', vc.rows.length > 0 ? vc.rows[0] : 'NO ENCONTRADO');

    console.log('\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

const ite_pk = process.argv[2] || 3067;
checkPrices(parseInt(ite_pk));
