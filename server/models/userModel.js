const mongoose = require('mongoose');

const userSchema=mongoose.Schema({
    username:{
        type: String,
        reqired:true,
        min:3,
        max:20,
        unique:true,

    },
    email:{
        type: String,
        reqired:true,
        min:3,
        max:50,
        unique:true,

    },
    password:{
        type: String,
        reqired:true,
        min:8,

    },
    IsAvatarImageSet:{
        type:Boolean,
        default:false,
    },
    avatarImage:{
        type:String,
        default:"",
    },

})

module.exports =mongoose.model("Users",userSchema);