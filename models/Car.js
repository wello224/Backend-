const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const findVisible = require('./findVisible');

const Schema = mongoose.Schema;

const CarSchema = new Schema(
    {
        name: { type: String, required: true },
        model: { type: String, required: true },
        image: { type: String, required: true },
        payPerDay: { type: Number, required: true },
        fuelType: { type: String, required: true },
        capacity: { type: Number, required: true },
        stock: {
            type: Number, required: true, min: [1, 'Quantity can not be less then 1.'],
            default: 1
        },
        bookedTimeSlots: [
            {
                from: { type: String, required: true },
                to: { type: String, required: true }
            }
        ],
        isVisible:
        {
            type: Boolean, default: true
        }

    }, {
    timestamps: true
    // 
}
);


const population =[]

CarSchema.pre('find', findVisible(population));
CarSchema.pre('findOne', findVisible(population));
CarSchema.pre('findOneAndUpdate', findVisible());
CarSchema.pre('count', findVisible());
CarSchema.pre('countDocuments', findVisible());

const Car = mongoose.model('Car', CarSchema);
module.exports = Car;

