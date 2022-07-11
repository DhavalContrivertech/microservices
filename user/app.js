const express = require("express")
const app = express()
const dotenv = require("dotenv")
app.use(express.json())

require("./config/db")

dotenv.config({path : "../.env"})

const PORT = 8000;

const userroutes = require("./routes/userroutes")
app.use("/user" , userroutes)

app.get('/users' , (req, res) => {
    res.status(200).json({message : "Hello this is message"})
})

app.listen(PORT , () => {
    console.log(`Server of User is runnign on ${PORT}`)
})