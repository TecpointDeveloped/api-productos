import pool from '../src/config/database.js';

const searchPrice = async () => {
  try {
    console.log('\n🔍 Buscando precio 895.00 en todas las tablas...\n');

    const ite_pk = 3231;

    // Buscar en precioventas
    console.log('📊 En precioventas:');
    const pv = await pool.query(
      'SELECT * FROM precioventas WHERE pre_prodfk = $1',
      [ite_pk]
    );
    console.log(`  Encontrados: ${pv.rows.length} registros`);
    pv.rows.forEach(row => {
      console.log(`    - pre_pk: ${row.pre_pk}, pre_precio: ${row.pre_precio}, pre_tpreciofk: ${row.pre_tpreciofk}`);
    });

    // Buscar en tprecios
    console.log('\n📋 En tprecios:');
    const tp = await pool.query('SELECT * FROM tprecios');
    console.log(`  Total tprecios: ${tp.rows.length}`);
    tp.rows.forEach(row => {
      console.log(`    - ${row.tpre_pk}: ${row.tpre_descripcion}`);
    });

    // Buscar en preciosremate
    console.log('\n💰 En preciosremate:');
    const pr = await pool.query(
      'SELECT * FROM preciosremate WHERE idprod = $1',
      [ite_pk]
    );
    console.log(`  Encontrados: ${pr.rows.length} registros`);
    if (pr.rows.length > 0) {
      console.log(pr.rows[0]);
    }

    // Buscar en v_ventaprod
    console.log('\n💵 En v_ventaprod:');
    const vv = await pool.query(
      'SELECT * FROM v_ventaprod WHERE idprod = $1 LIMIT 1',
      [ite_pk]
    );
    console.log(`  Encontrados: ${vv.rows.length} registros`);
    if (vv.rows.length > 0) {
      console.log(vv.rows[0]);
    }

    // Buscar directamente 895 en precioventas
    console.log('\n🎯 Buscando 895 en precioventas:');
    const p895 = await pool.query(
      "SELECT * FROM precioventas WHERE pre_precio = '895.00' OR pre_precio = 895"
    );
    console.log(`  Encontrados: ${p895.rows.length} registros con precio 895`);
    if (p895.rows.length > 0) {
      p895.rows.slice(0, 3).forEach(row => {
        console.log(`    - pre_prodfk: ${row.pre_prodfk}, pre_precio: ${row.pre_precio}`);
      });
    }

    console.log('\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

searchPrice();
