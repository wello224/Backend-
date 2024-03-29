const createError = require('http-errors');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const Product = require('../Models/Car');
const cloudinary = require('../utils/cloudinary');

module.exports = {

//search function by name and model

  get: async(req, res) =>{
    try{
        const {key , page , limit} = req.query
        const skip = (page - 1) * limit
        const search = key ? {
            "$or": [
                    {name: {$regex: key , $options: "$i"}},
                    {model: {$regex: key , $options: "$i"}},
                    
            ]
        } : {}
        const cars = await Product.find(search).skip(skip).limit(limit)
        res.status(200).json({cars})
    }catch (err) {
        res.status(500).json(err);
    }
},







  getAllProducts: async (req, res, next) => {
    try {
      const results = await Product.find({}, { __v: 0 });
      // const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Product.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewProduct: async (req, res, next) => {
    const{name,model, image, payPerDay,fuelType,capacity,stock} =req.body;

    try {
      const conc = await cloudinary.uploader.upload(image,{
        folder: "products",
        // width: 300,
        // crop: "scale" 
      })
      const product = new Product(req.body);
      const result = await product.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }

    /*Or:
  If you want to use the Promise based approach*/
    /*
  const product = new Product({
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err.message);
    }); 
    */
  },

  findProductById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const product = await Product.findById(id);
      // const product = await Product.findOne({ _id: id });
      if (!product) {
        throw createError(404, 'Product does not exist.');
      }
      res.send(product);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Product id'));
        return;
      }
      next(error);
    }
  },

  // findProductByName: async (req, res, next) => {
    
  //   let data =await product.find();
  //   res.send(data);
  //   // res.send("search done");
  //   // try {
  //   //   let product = await Product.find();
  //   //   // const product = await Product.findOne({ _id: id });
  //   //   if (!product) {
  //   //     throw createError(404, 'Product does not exist.');
  //   //   }
  //   //   res.send(product);
  //   // } catch (error) {
  //   //   console.log(error.message);
  //   //   if (error instanceof mongoose.CastError) {
  //   //     next(createError(400, 'Invalid Product model'));
  //   //     return;
  //   //   }
  //   //   next(error);
  //   // }
  // },

  updateAProduct: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Product.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Product does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Product Id'));
      }

      next(error);
    }
  },

  // deleteAProduct: async (req, res, next) => {
  //   const id = req.params.id;
  //   try {
  //     const result = await Product.findByIdAndDelete(id);
  //     // console.log(result);
  //     if (!result) {
  //       throw createError(404, 'Product does not exist.');
  //     }
  //     res.send(result);
  //   } catch (error) {
  //     console.log(error.message);
  //     if (error instanceof mongoose.CastError) {
  //       next(createError(400, 'Invalid Product id'));
  //       return;
  //     }
  //     next(error);
  //   }
  // },


// update delete method to remove product using findVisible function

  deleteAProduct: async (req, res, next)=>{
    const {id}=req.body
    try {
    const newProduct=await Product.findByIdAndUpdate(id,
        {
            isVisible:false,
        },{new:true})
        if (!newProduct) {
          throw createError(404, 'Product does not exist.');
        }
        res.send(newProduct );
      }
      catch (error) {
             console.log(error.message);
             if (error instanceof mongoose.CastError) {
              next(createError(400, 'Invalid Product id'));
              return;
            }
            next(error);
          }
}

};