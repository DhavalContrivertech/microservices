const order = require("../modal/order")

exports.registerorder = async (req, res) => {
    try {

        const { orderbyid , productid , quantity } = req.body;

        const orders = await order.create({ orderbyid , productid , quantity })

        if (!orders) {
            res.status(400).json({message : "Unable to create orders "})
            return
        }

        if (orders) {
            res.status(200).json({message : "orders is created " , orders})
            return
        }

    } catch (error) {
        res.status(400).json({error : 'unable to register order !'})
    }
}

exports.getallorder = async (req, res) => {
    try {
        const orders = await order.find()

        if (!orders) {
            res.status(400).json({message : "Unable to get record"})
            return
        }

        if (orders) {
            res.status(200).json({message : "able to get record" , orders})
            return
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({error : 'unable to Get orders !'})
    }
}

exports.findorderbyid = async (req, res) => {
    try {
        const orders = await order.findById(req.params.id)

        if (!orders) {
            res.status(400).json({message : "Unable to get record"})
            return
        }

        if (orders) {
            res.status(200).json({message : "able to get record" , orders})
            return
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({error : 'unable to Get orders !'})
    }
}

exports.updateorder = async (req, res) => {
    try {

        const { orderbyid , productid , quantity } = req.body;

        const findorder = await order.findOne({_id : req.params.id})

        if (!findorder) {
            res.status(400).json({error : 'unable to Update record Users in try !'})
            return
        }

        if (findorder) {

            const updateorder = await order.findByIdAndUpdate(findorder._id , {
                orderbyid : orderbyid , 
                productid : productid , 
                quantity : quantity
            } , { new : true })

            if (updateorder) {
                res.status(200).json({message : 'Record is updated' , updateorder})
                return
            }

            if (!updateorder) {
                res.status(400).json({error : 'Record is not updated'})
                return
            }
        }
    } catch (error) {
        res.status(400).json({error : 'unable to Update record order !'})
    }
}

exports.deleteorder =  async (req, res) => {
    try {

        const findorder = await order.findOne({_id : req.params.id})

        if (!findorder) {
            res.status(400).json({error : 'unable to delete record Users in try !'})
            return
        }

        if (findorder) {

            const deleteorder = await order.findOneAndDelete(findorder._id)

            if (deleteorder) {
                res.status(200).json({message : 'Record is delete' , deleteorder})
                return
            }

            if (!deleteorder) {
                res.status(400).json({error : 'Record is not delete order'})
                return
            }
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({error : 'unable to delete record order !'})
    }
}