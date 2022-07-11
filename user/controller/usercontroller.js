const user = require("../modal/user")
const jwt = require("jsonwebtoken")
const scheduler = require("node-schedule")

exports.registeruser = async (req, res) => {
    try {

        const { Name , Email } = req.body;
        
        const users = await user.create({Name , Email})
        
        if (!users) {
            res.status(400).json({message : "Unable to create users "})
            return
        }

        if (users) {
            res.status(200).json({message : "Users is created " , users})
            return
        }
        
    } catch (error) {
        console.log(error)
        res.status(400).json({error : 'unable to register !'})
    }
}

exports.loginuser = async (req, res) => {
    try {
        const { Name , Email } = req.body;
        
        const finduser = await user.findOne({Email : Email})

        if (!finduser) {
            res.status(400).json({message : "Login failled in try "})
            return
        }
        
        if (finduser) {

            if (finduser.Name !== Name) {
                res.status(400).json({message : "Login failled in try "})
                return
            }

            if (finduser.Name === Name) {
                console.log(finduser._id.toString())
                console.log(process.env.SECRET_KEY)
                const token =  jwt.sign({id : finduser._id.toString()} , process.env.SECRET_KEY , {
                    expiresIn : "7d"
                })
                console.log(token)
                res.status(200).json({message : "Login Succesfull " , finduser , token})
                return
            }
            
            
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({message : "Login failled"})
    }
}

exports.getalluser = async (req, res) => {
    try {
        const users = await user.find()

        if (!users) {
            res.status(400).json({message : "Unable to get record"})
            return
        }

        if (users) {
            res.status(200).json({message : "able to get record" , users})
            return
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({error : 'unable to Get Users !'})
    }
}

exports.finduserbyid = async (req, res) => {
    try {
        const users = await user.findById(req.params.id)

        if (!users) {
            res.status(400).json({message : "Unable to get record"})
            return
        }

        if (users) {
            res.status(200).json({message : "able to get record" , users})
            return
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({error : 'unable to Get Users !'})
    }
}

exports.updateuser = async (req, res) => {
    try {

        const { Name , Email } = req.body;

        const finduser = await user.findOne({_id : req.params.id})

        if (!finduser) {
            res.status(400).json({error : 'unable to Update record Users in try !'})
            return
        }

        if (finduser) {

            const updateuser = await user.findByIdAndUpdate(finduser._id , {
                Name : Name,
                Email : Email
            } , { new : true })

            if (updateuser) {
                res.status(200).json({message : 'Record is updated' , updateuser})
                return
            }

            if (!updateuser) {
                res.status(400).json({error : 'Record is not updated'})
                return
            }
        }
    } catch (error) {
        res.status(400).json({error : 'unable to Update record Users !'})
    }
}


exports.deleteuser =  async (req, res) => {
    try {

        const finduser = await user.findOne({_id : req.params.id})

        if (!finduser) {
            res.status(400).json({error : 'unable to delete record Users in try !'})
            return
        }

        if (finduser) {

            const deleteuser = await user.findOneAndDelete(finduser._id)

            if (deleteuser) {
                res.status(200).json({message : 'Record is delete' , deleteuser})
                return
            }

            if (!deleteuser) {
                res.status(400).json({error : 'Record is not deleteuser'})
                return
            }
        }
    } catch (error) {
        res.status(400).json({error : 'unable to delete record Users !'})
    }
}

exports.scheduleMeeting = async (req, res) => {
    try {
        const date = req.params.date;        
        // console.log(date)
        const startTime = new Date(Date.now() + 5000);
        const endTime = new Date(startTime.getTime() + 5000);
        const job = scheduler.scheduleJob({ start: startTime, end: endTime, rule: '*/2 * * * * *' }, function(){
        console.log('Time for tea!');
        });

        res.status(200).json({message : "This is " , date })

    } catch (error) {
        console.log(error)
        res.status(200).json({error : "This is error" })
    }
}