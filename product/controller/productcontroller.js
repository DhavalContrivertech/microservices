const product = require("../modal/product")
const axios = require("axios")

exports.registerproduct = async (req, res) => {
    try {
        const { userid , productname } = req.body;

        
        const userdata = await axios.get('http://localhost:8000/user/finduserbyid/' + userid)

        const products = await product.create({ userid : userdata.data.users , productname })
        if (!products) {
            res.status(400).json({message : "Unable to create products "})
            return
        }

        if (products) {
            await products.save()
            res.status(200).json({message : "product is created " , products})
            return
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({error : "Unable to register Product"})
    }
}

exports.getallproduct = async (req, res) => {
    try {
        const products = await product.find()

        if (!products) {
            res.status(400).json({message : "Unable to get record"})
            return
        }

        if (products) {

            // axios.get("localhost:8000/user/finduserbyid/" + product.userid).then((responce) => {
                res.status(200).json({message : "able to get record" , products })
                return
            // }).catch((err) => {
            //     console.log(err)
            // })
            
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({error : 'unable to Get Users !'})
    }
}

exports.findProductByUserid = async (req, res) => {

    try {
        const data = req.params.id;
        const productdata = await axios.get(`http://localhost:8000/user/finduserbyid/${data}`)
        // console.log(productdata.data.users._id)

        const findproduct = await product.find({userid : productdata.data.users._id})
        console.log(findproduct)
    } catch (error) {

        res.status(400).json({error : 'unable to Get Users !'})
    }
} 

exports.findproductbyid = async (req, res) => {
    try {
        const products = await product.findById(req.params.id)

        if (!products) {
            res.status(400).json({message : "Unable to get record"})
            return
        }

        if (products) {
            res.status(200).json({message : "able to get record" , products})
            return
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({error : 'unable to Get Users !'})
    }
}



exports.updateproduct = async (req, res) => {
    try {

        const { userid , productname } = req.body;

        const findproduct = await product.findOne({_id : req.params.id})

        if (!findproduct) {
            res.status(400).json({error : 'unable to Update record product in try !'})
            return
        }

        if (findproduct) {

            const updateproduct = await product.findByIdAndUpdate(findproduct._id , {
                userid : userid ,
                productname : productname
            } , { new : true })

            if (updateproduct) {
                res.status(200).json({message : 'Record is updated' , updateproduct})
                return
            }

            if (!updateproduct) {
                res.status(400).json({error : 'Record is not updated'})
                return
            }
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({error : 'unable to Update record product !'})
    }
}

exports.deleteproduct =  async (req, res) => {
    try {

        const findproduct = await product.findOne({_id : req.params.id})

        if (!findproduct) {
            res.status(400).json({error : 'unable to delete record Users in try !'})
            return
        }

        if (findproduct) {

            const deleteproduct = await product.findOneAndDelete(findproduct._id)

            if (deleteproduct) {
                res.status(200).json({message : 'Record is delete' , deleteproduct})
                return
            }

            if (!deleteproduct) {
                res.status(400).json({error : 'Record is not deleteuser'})
                return
            }
        }
    } catch (error) {
        res.status(400).json({error : 'unable to delete record Users !'})
    }
}