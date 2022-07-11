const mongoose = require("mongoose")

const user = mongoose.Schema({
    Name : {
        type : String
    },
    Email : {
        type : String
    }
})

module.exports = mongoose.model("user" , user)