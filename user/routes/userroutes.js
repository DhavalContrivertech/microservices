const usercontroller = require("../controller/usercontroller")
const express = require("express")
const route = express.Router()
const autthorize = require("../../services/authorization")

route.post("/registeruser" , usercontroller.registeruser)

route.post("/loginuser" , usercontroller.loginuser)

route.get("/getalluser" , autthorize , usercontroller.getalluser)

route.get("/finduserbyid/:id" , usercontroller.finduserbyid)

route.put("/updateuser/:id" , usercontroller.updateuser)

route.delete("/deleteuser/:id" , usercontroller.deleteuser)

route.post("/schedule/:date" , usercontroller.scheduleMeeting)

module.exports = route