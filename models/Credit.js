const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const findVisible = require('./findVisible');
const Schema = mongoose.Schema;

const CreditSchema = new Schema({

    user:
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
 
    CardHolderName:
    {
        type: String
        , required: true,
        unique: true
    },
    CardNumber:
    {
        type: Number
        , length: 16
        , required: true,
        unique: true
    },
    CardType:
    {
        type: String,
        enum: ["VISA", "MasterCard"]
    },
    CVV:
    {
        type: Number,
        length: 3,
        required: true,
        unique: true

    },
    expire:
    {
        type: Date
        , required: true

    },
    isVisible:
    {
        type: Boolean, default: true
    }

})

const population =
    [{
        path: 'user',
        match: { isVisible: true }
    }]

CreditSchema.pre('find', findVisible(population));
CreditSchema.pre('findOne', findVisible(population));
CreditSchema.pre('findOneAndUpdate', findVisible());
CreditSchema.pre('count', findVisible());
CreditSchema.pre('countDocuments', findVisible());




CreditSchema.plugin(deepPopulate,{})


const Credit=mongoose.model('Credit',CreditSchema,'Credit');
module.exports = Credit 