const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreditSchema = new Schema({

    creditNumber:
    {
        type: Number
    },

    creditType:
    {
        type: String,
        enum: ["VISA", "mastercard"]
    },
    cvc:
    {
        type: Number
    },
    expire:
    {
        type: Date
    },
    Id:
    {
        type: String
    }

})


module.exports = Credit = mongoose.model('Credit', CreditSchema);