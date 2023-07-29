const mongoose=require('mongoose');
const foodSchema = require('./Food').foodSchema;
const orderStatus = require('../shared/enums/orderStatus');
const latLngSchema = new mongoose.Schema({
    lat: {type: String, required: true},
    lng: {type: String, required: true}
})

const latlng  = new mongoose.model("order", latLngSchema);

const orderItemSchema = new mongoose.Schema({
    food:{type:foodSchema, required:true},
    price:{type:Number, required:true},
    quantity:{type:Number, required:true}
})

const orderSchema = new mongoose.Schema({
    name:{type:String,required:true},
    address:{type:String,required:true},
    addressLatLng:{type:latLngSchema, required:true},
    paymentId:{type:String},
    totalPrice:{type:Number, required:true},
    items:{type:[orderItemSchema], required:true},
    status:{type:String,default:orderStatus.NEW},
    user:{type:mongoose.Schema.Types.ObjectId, required:true},
    checkout_id:{type:String}
},{
    timestamps:true,
    toJSON: {virtuals:true},
    toObject:{virtuals:true}
})

module.exports = new mongoose.model("userOrder",orderSchema);

