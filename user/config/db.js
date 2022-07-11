const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/user").then((res) => {
    console.log("db connected")
}).catch((err) => {
    console.log("db is connected")
})