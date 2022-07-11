const mongoose = require("mongoose")

const product = mongoose.Schema({
    userid : {
        Name : {
            type : String
        },
        Email : {
            type : String
        }
    },
    productname : {
        type : String
    }
})

module.exports = mongoose.model("product" , product)