const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        firstName: {type: String, required: true,},
        lastName: {type: String, required: true,},
        email: {
            type: String, required: true, unique: [true, 'email is already present'],
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid Email')
                }
            }
        },
        password: {type: String, required: true},
        mobile: {type: Number, min: 10, required: true, unique: true},
        // address:{type:String,required:true},
        houseNumber: {type: String, min: 6, required: true},
        streetArea: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
        pincode: {type: Number, min: 6, required: true},
        isAdmin: {type: Boolean, required: true},
        cart: {type: Object},
        otp: {type: Number}
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true},
        timestamps: true
    }
)
module.exports = new mongoose.model("user", userSchema);