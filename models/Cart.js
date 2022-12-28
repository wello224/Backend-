const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const findVisible = require('./findVisible');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
    car: [{
        productId: {
            type: String,
        },
        name: String,
        stock: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.'],
            default: 1
        },
        payPerDay: {type: Number, required: true},
    }],
    bill: {
        type: Number,
        required: true,
        default: 0
    }
});



const population =
    [{
        path: 'user',
        match: { isVisible: true }
    }]

    CartSchema.pre('find', findVisible(population));
    CartSchema.pre('findOne', findVisible(population));
    CartSchema.pre('findOneAndUpdate', findVisible());
    CartSchema.pre('count', findVisible());
    CartSchema.pre('countDocuments', findVisible());




    CartSchema.plugin(deepPopulate,{})


module.exports = Cart = mongoose.model('Cart',CartSchema);