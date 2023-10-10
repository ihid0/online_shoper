const router = require('express').Router();
const { findByIdAndUpdate } = require('../models/product');
const product = require('../models/product');
const user = require('../models/user');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const productController = require('../controllers/productController');

//upload image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix +".png")
    }
});
const upload = multer({ storage: storage });

isAuthenticated = (req, res, next)=>{
    if(req.isAuthenticated()) return next();
    res.redirect('/');
}

///////////////////////////////////////////-- CRUD OPERATIONS --///////////////////////////////////////////


///////////////////////////////////////////-- CREATE --////////////////////////////////////////
// route to Addproduct page
router.get('/create', isAuthenticated, productController.index);
//post product info and save it
router.post('/create', productController.create);

///////////////////////////////////////////-- READ --////////////////////////////////////////
// display products
router.get('/', productController.display);
// details page
router.get('/details/:id',isAuthenticated, productController.details);


///////////////////////////////////////////-- UPDATE --////////////////////////////////////////
//edit 
router.get('/edit/:id',isAuthenticated, productController.edit);
// update edited product
router.put('/update/:id',isAuthenticated, productController.update);



///////////////////////////////////////////-- DELETE --////////////////////////////////////////
// delete product
router.get('/delete/:id',isAuthenticated, productController.delete);

//user products
router.get('/userproducts',isAuthenticated, productController.userproducts);



//upload product image 
router.post('/productImage/:id', upload.single('image'), productController.productImage);

module.exports = router;