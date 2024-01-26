
const User = require("../models/userModel");
const bcrypt=require("bcrypt");

module.exports.register=async (req, res, next) => {

    try{
        const {username,email,password,confirmPassword} = req.body;

        const isUserExist=await User.findOne({ username});
        if(isUserExist) {
            return res.json({msg:"Username already used",status:false});
        }

        const isEmailExist=await User.findOne({ email});
        if(isEmailExist) {
            return res.json({msg:"email already used",status:false});
        }
        
        const hashedPassword=await bcrypt.hash(password,10);

        const user=await User.create({
            username,
            email,
            password:hashedPassword,
        })

        delete user.password;

        return res.json({status:true,user});

    }catch(err) {
        next(err);
    }


}