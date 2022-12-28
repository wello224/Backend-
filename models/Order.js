const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"users",
    },
    orderItems:[
        {
            name:{type:String,required:true},
            qty:{type:Number,required:true},
            image:{type:String,required:true},
            price:{type:Number,required:true},
            car:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:"cars",
            },
        }
    ],
    shippingAddress:{
        address:{type:String,required:true},
        city:{type:String,required:true},
        country:{type:String,required:true},
    },
    paymentMethod:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Credit"
    },
    paymentResult:{
        id:{type:String},
        status:{type:String},
        update_time:{type:String},
        email_address:{type:String},
    },
    shippingPrice:{
        type:Number,
        require:true,
        default:0.0,
    },
    totalPrice:{
        type:Number,
        require:true,
        default:0.0,            
    },
    isPaid:{
        type:Boolean,
        require:true,
        default:false,
    },
    paidAt:{
        type:Date,
    },
    idDelivered:{
        type:Boolean,
        require:true,
        default:false,
    },
    deliveredAt:{
        type:Date,
    },
},{
    timestamps: true
}
)

module.exports = Order = mongoose.model('order',OrderSchema);