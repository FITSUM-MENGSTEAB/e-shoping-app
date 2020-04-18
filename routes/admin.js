const express = require('express');
const check = require('../middleware/permissions');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/isauth');

const router = express.Router();


router.get('/products', isAuth,check.permit("admin"), adminController.getProducts);

router.get('/add-product', isAuth, check.permit("admin"), adminController.getAddProduct);

router.post('/add-product', isAuth,check. permit("admin"), adminController.postAddProduct);

router.get('/edit-product/:prodId', check.permit("admin"), isAuth, adminController.getEditProduct);

router.post('/edit-product', isAuth, check.permit("admin"), adminController.postEditProduct);

router.post('/delete-product', isAuth,check. permit("admin"), adminController.postDeleteProduct);

module.exports = router;
