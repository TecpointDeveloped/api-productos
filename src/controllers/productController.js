import pool from '../config/database.js';

export const getProductBySerieController = async (req, res) => {
  try {
    const { ite_serie } = req.params;

    // Validar que el parámetro no esté vacío
    if (!ite_serie || ite_serie.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'El parámetro ite_serie es requerido',
      });
    }

    // Obtener datos del producto
    const itemResult = await pool.query(
      'SELECT * FROM items WHERE TRIM(ite_serie) = $1',
      [ite_serie.trim()]
    );

    if (itemResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró producto con serie: ${ite_serie}`,
      });
    }

    const product = itemResult.rows[0];

    // Obtener TODOS los precios del producto
    const pricesResult = await pool.query(`
      SELECT
        pv.pre_pk,
        pv.pre_precio,
        pv.pre_inventario,
        pv.pre_porcom,
        pv.pre_porceutilidad,
        pv.pre_almacenfk,
        pv.pre_default,
        tp.tpre_pk,
        tp.tpre_descripcion,
        tp.tpre_porcentaje
      FROM precioventas pv
      LEFT JOIN tprecios tp ON pv.pre_tpreciofk = tp.tpre_pk
      WHERE pv.pre_prodfk = $1
      ORDER BY tp.tpre_pk
    `, [product.ite_pk]);

    // Devolver solo los campos requeridos
    res.status(200).json({
      success: true,
      message: 'Producto encontrado',
      data: {
        ite_serie: product.ite_serie,
        ite_upc: product.ite_upc,
        ite_descri: product.ite_descri,
        ite_stock: product.ite_stock,
        precios: pricesResult.rows.map(p => ({
          tipo: p.tpre_descripcion.trim(),
          precio: p.pre_precio,
        })),
      },
    });
  } catch (error) {
    console.error('Error en getProductBySerieController:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al buscar el producto',
      error: error.message,
    });
  }
};

export const getAllProductsController = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;

    const result = await pool.query(
      `SELECT
        i.ite_pk,
        i.ite_descri,
        i.ite_price1,
        i.ite_price2,
        i.ite_price3,
        i.ite_price4,
        i.ite_cost1,
        i.ite_cost2,
        i.ite_stock,
        i.ite_serie,
        i.ite_taxable,
        i.ite_status,
        i.ite_marcafk,
        i.ite_categoriafk
      FROM items i
      LIMIT $1 OFFSET $2`,
      [parseInt(limit), parseInt(offset)]
    );

    res.status(200).json({
      success: true,
      message: 'Productos obtenidos',
      data: result.rows,
      total: result.rows.length,
    });
  } catch (error) {
    console.error('Error en getAllProductsController:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los productos',
      error: error.message,
    });
  }
};

export const getProductDetailController = async (req, res) => {
  try {
    const { ite_pk } = req.params;

    if (!ite_pk) {
      return res.status(400).json({
        success: false,
        message: 'El parámetro ite_pk es requerido',
      });
    }

    // Obtener datos del producto
    const itemResult = await pool.query(
      'SELECT * FROM items WHERE ite_pk = $1',
      [parseInt(ite_pk)]
    );

    if (itemResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No se encontró producto con ID: ${ite_pk}`,
      });
    }

    const product = itemResult.rows[0];

    // Obtener TODOS los precios del producto
    const pricesResult = await pool.query(`
      SELECT
        pv.pre_pk,
        pv.pre_precio,
        pv.pre_inventario,
        pv.pre_porcom,
        pv.pre_porceutilidad,
        pv.pre_almacenfk,
        pv.pre_default,
        tp.tpre_pk,
        tp.tpre_descripcion,
        tp.tpre_porcentaje
      FROM precioventas pv
      LEFT JOIN tprecios tp ON pv.pre_tpreciofk = tp.tpre_pk
      WHERE pv.pre_prodfk = $1
      ORDER BY tp.tpre_pk
    `, [parseInt(ite_pk)]);

    // Devolver solo los campos requeridos
    res.status(200).json({
      success: true,
      message: 'Detalle del producto obtenido',
      data: {
        ite_serie: product.ite_serie,
        ite_upc: product.ite_upc,
        ite_descri: product.ite_descri,
        ite_stock: product.ite_stock,
        precios: pricesResult.rows.map(p => ({
          tipo: p.tpre_descripcion.trim(),
          precio: p.pre_precio,
        })),
      },
    });
  } catch (error) {
    console.error('Error en getProductDetailController:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al obtener el detalle del producto',
      error: error.message,
    });
  }
};
