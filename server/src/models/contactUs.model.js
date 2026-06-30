import mongoose from "mongoose";
const contactUsSchama  =new mongoose.Schema(
    {
        name:{
            type:String,
            trim: true,
            require:true,
        },
        email:{
            type:String,
            trim:true,
            require:true,
        },
        phone:{
            type:Number,
            trim:true,
            require:true,
        },
        subject:{
            type:String,
            trim:true,
        },
        description:{
            type:String,
        },
        status:{
            type:Boolean,
            default:true,
        },

    },
    {timestamps:true}
);
const contactModel = mongoose.model("ContactUs",contactUsSchama)
export default contactModel;