const express = require("express")
const app = express()

app.use(express.json())

require("./config/db")

const PORT = 8001;

const productroutes = require("./routes/productroutes")
app.use("/product" , productroutes)

app.get('/product' , (req, res) => {
    res.status(200).json({message : "Hello this is message Product"})
})

app.listen(PORT , () => {
    console.log(`Server of User is runnign on ${PORT}`)
})