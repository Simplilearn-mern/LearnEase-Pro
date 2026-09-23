const mongoose = require("mongoose");


const feedbackSchema = new mongoose.Schema(
{
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true
    },

    learnerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    learnerName:{
        type:String,
        required:true
    },

    message:{
        type:String,
        required:true
    },

    rating:{
        type:Number,
        default:5
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Feedback",
    feedbackSchema
);