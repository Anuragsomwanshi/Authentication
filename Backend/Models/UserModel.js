
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({


    name:{
        type:String,
        require:true,
    },

    email:{
        type:String,
        require:true,
        unique:true,
    },

    password:{
        type:String,
        require:true,
    },

    verifyotp:{
        type:String,
        default:''
    },

    verifyotpExpireAt:{
        type:Number,
        default: 0,
    },


    isverify:{
        type:Boolean,
        default:false,
    },

    resetotp:{
        type:String,
        default:'',
    },
    resetotpExpireAt:{
        type:Number,
        default:0,
    }
});

const userModel = mongoose.models.user  || mongoose.model('user',userSchema);
export default userModel;