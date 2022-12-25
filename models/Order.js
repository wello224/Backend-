const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const findVisible = require('./findVisible');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
        , require: true
    },
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            car: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Car"
            },
        }
    ],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
    },
    paymentMethod: {
        type: mongoose.Schema.Types.ObjectId, ref: "Credit"
        , required: true
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    shippingPrice: {
        type: Number,
        require: true,
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        require: true,
        default: 0.0,
    },
    isPaid: {
        type: Boolean,
        require: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    idDelivered: {
        type: Boolean,
        require: true,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
    isVisible:
    {
        type: Boolean, default: true
    }
}, {
    timestamps: true
})

const population =
    [{
        path: 'user',
        match: { isVisible: true }
    },
    {
        path: 'car',
        match: { isVisible: true }
    },
    {
        path: 'paymentMethod',
        match: { isVisible: true }

    }]

OrderSchema.pre('find', findVisible(population));
OrderSchema.pre('findOne', findVisible(population));
OrderSchema.pre('findOneAndUpdate', findVisible());
OrderSchema.pre('count', findVisible());
OrderSchema.pre('countDocuments', findVisible());



OrderSchema.plugin(deepPopulate, {})


module.exports = Order = mongoose.model('Order', OrderSchema);