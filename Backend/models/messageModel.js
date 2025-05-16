import mongoose, { mongo }  from "mongoose";
const messageSchema=mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,

    },
    
    message: { type: String, required: true, maxlength: 1000, trim: true },


    createdAt:{type:Date,default:Date.now},
},{
    timestamps:true,
})

const Message =mongoose.model("Message",messageSchema)
export default Message