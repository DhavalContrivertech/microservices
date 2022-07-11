const mongoose = require("mongoose")

const order = mongoose.Schema({
    orderbyid : {
        type : mongoose.Schema.ObjectId
    },
    productid : {
        type : mongoose.Schema.ObjectId
    },
    quantity : {
        type : Number
    }
})

module.exports = mongoose.model("order" , order)