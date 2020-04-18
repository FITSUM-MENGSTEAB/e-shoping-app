/** 
 * Admin Controllers communicates with routers 
 * Functions used each routers in admin operations 
 * By Avater Group @march , 18, 2020
 */
const Product = require('../models/product');
const multer  = require('multer')
const fs = require('fs');
const path = require('path')


// upload image and storage in local disk 
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('avatar');

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// get all product from products colection 
exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('admin/products', {
                pageTitle: 'Products',
                path: '/admin/products',
                prods: products
            });
        })
        .catch(err => console.log(err));
};

// get form page to add product 
exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
};


// post/ save new product to collection 
exports.postAddProduct = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) throw console.error(err);

    const title = req.body.title;
    const imageUrl = req.file.filename;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        userId: req.user
    });
    product.save()
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
    })
};

//   edit/ update  products 
exports.getEditProduct = (req, res, next) => {
    const prodId = req.params.prodId;
    Product.findById(prodId)
        .then(product => {
            res.render('admin/edit-product', {
                product: product,
                pageTitle: 'Edit Product',
                path: '/admin/products'
            });
        })
        .catch(err => console.log(err));

}

 //  save edited product with updates 
exports.postEditProduct = (req, res, next) => {
    const id = req.body._id;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    Product.findById(id).then(prod => {
        prod.title = title;
        prod.imageUrl = imageUrl;
        prod.price = price;
        prod.description = description;
        return prod.save();
    })
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));

}

//  delete product 
exports.postDeleteProduct = (req, res, next) => {
    Product.findByIdAndRemove(req.body._id)
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));

}
