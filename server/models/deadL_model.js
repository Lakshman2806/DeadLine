const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const deadlineSchema = new Schema({
    title: {
        type: String,
        required : true
    },
    deadline : {
        type: Date,
        required : true
    },
    difficulty : {
        type: Number,
        required : true
    },
    progress : {
        type: Number,
        required : true
    }
},{timestamps: true});    // this will automatically add the createdAt and the updatedAt field for us


module.exports = mongoose.model("Deadline", deadlineSchema);