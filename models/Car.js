const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema(
  {
    name: {type: String, required: true},
    model: {type: String, required: true},
    image: 
    {    public_id:{
        type: String,
        required: true
    },
        url:{
            type: String,
            required: true
        }
        
        },
    payPerDay: {type: Number, required: true},
    fuelType: {type: String, required: true},
    capacity: {type: Number, required: true},
    stock: {type:Number,required: true,min: [1, 'Quantity can not be less then 1.'],
    default: 1},
    bookedTimeSlots: [
        {
            from: {type: String, required: true},
            to: {type: String, required: true}
        }
    ],
   
}, {
    timestamps: true
// 
}
);
const Car = mongoose.model('car', CarSchema);
module.exports = Car;

