import express from 'express';
import {
  getProductBySerieController,
  getAllProductsController,
  getProductDetailController,
} from '../controllers/productController.js';

const router = express.Router();

// Ruta para obtener todos los productos con paginación
router.get('/', getAllProductsController);

// Ruta para obtener detalle completo del producto (incluye precios)
router.get('/detalle/:ite_pk', getProductDetailController);

// Ruta para buscar producto por serie
router.get('/serie/:ite_serie', getProductBySerieController);

export default router;
