const mongoose = require("mongoose")
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken');
SECRETE_KEY = "KLETECHNOLOGICALALUMNIPORTAL"
const RegisterSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

RegisterSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, SECRETE_KEY);
        this.tokens = this.tokens.concat({ token: token })
        await this.save();
        return token;
    }
    catch (err) {
        console.log(err)
    }
}
const reg = mongoose.model('REG', RegisterSchema)
module.exports = reg;