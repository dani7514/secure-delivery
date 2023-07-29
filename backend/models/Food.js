const mongoose = require('mongoose');
// const validator=require('validator');
const foodSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        price: {type: Number, required: true},
        tags: {type: [String], required: true},
        favorite: {type: Boolean, required: false},
        imageUrl: {type: String, required: true},
        star: {type: Number, required: true},
        origins: {type: [String], required: true},
        cookTime: {type: String, required: true},
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true},
        timestamps: true
    }
)
module.exports.foodSchema = foodSchema;
module.exports.foodModel = new mongoose.model('food', foodSchema);