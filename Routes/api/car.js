const express = require('express');
const router = express.Router();

const ProductController = require('../../middleware/carproducts')

//Get a list of all products
router.get('/', ProductController.getAllProducts);

//Create a new product
router.post('/', ProductController.createNewProduct);

//Get a product by name
// router.get('/search-name:key', ProductController.findProductByName);

//Get a product by id
router.get('/search-id/:id', ProductController.findProductById);

//Update a product by id
router.patch('/update/:id', ProductController.updateAProduct);

//Delete a product by id
router.delete('/delete/:id', ProductController.deleteAProduct);

module.exports = router;
