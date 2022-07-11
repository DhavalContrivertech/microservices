const ordercontroller = require("../controller/ordercontroller")
const express = require("express")
const routes = express.Router()

routes.post('/registerorder' , ordercontroller.registerorder)

routes.get('/getallorder' , ordercontroller.getallorder)

routes.get('/findorderbyid/:id' , ordercontroller.findorderbyid)

routes.put('/updateorder/:id' , ordercontroller.updateorder)

routes.delete('/deleteorder/:id' , ordercontroller.deleteorder)

module.exports = routes