const productcontroller = require("../controller/productcontroller")

const express = require("express")
const route = express.Router()

route.post('/registerproduct' , productcontroller.registerproduct)

route.get('/getallproduct' , productcontroller.getallproduct)

route.get('/findproductbyid/:id' , productcontroller.findproductbyid)

route.get('/finduserwithid/:id' , productcontroller.findProductByUserid)

route.put('/updateproduct/:id' , productcontroller.updateproduct)

route.delete('/deleteproduct/:id' , productcontroller.deleteproduct)

module.exports = route