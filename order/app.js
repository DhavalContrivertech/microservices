const express = require("express")
const app = express()

app.use(express.json())

require("./config/db")

const PORT = 8002;

const orderroutes = require("./routes/orderroutes")
app.use("/order" , orderroutes)

app.get('/order' , (req, res) => {
    res.status(200).json({message : "Hello this is message order"})
})

app.listen(PORT , () => {
    console.log(`Server of User is runnign on ${PORT}`)
})