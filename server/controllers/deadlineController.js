const Deadline = require("../models/deadL_model");
const mongoose = require("mongoose");


// get all deadlines
const getAllDeadlines = async (req, res) => {
    const user_id = req.user._id;

    const workouts = await Deadline.find({user_id}).sort({createdAt: -1});
    res.status(200).json(workouts);
}


//get a single deadline
const getSingleDeadline = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : "Invalid ID"});
    }
    const deadline = await Deadline.findById(id);
    if(!deadline) {
        return res.status(404).json({error : "Deadline not found"});
    }

    res.status(200).json(deadline);
}





// create a deadline
const  createDeadline = async (req, res) => {
    const {title, deadline, difficulty, progress} = req.body;

    try {
        const user_id = req.user._id;
        const newDeadline = await Deadline.create({title, deadline, difficulty, progress, user_id});
        res.status(200).json(newDeadline);
    }
    catch (err) {
        // console.log(err);
        res.status(400).json({error : err.message})
    }
    // res.json({mssg: "New Deadline"});
}

// delete a deadline
const deleteDeadline = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : "Invalid ID"});
    }

    const deadline = await Deadline.findByIdAndDelete(id); 
    if(!deadline) {
        return res.status(404).json({error : "Deadline not found"});
    }
    res.status(200).json(deadline);
}


// update a deadline
const updateDeadline = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error : "Invalid ID"});
    }

    const deadline = await Deadline.findByIdAndUpdate(id, req.body, {new : true})
    if(!deadline) {
        return res.status(404).json({error : "Deadline not found"});
    }
    res.status(200).json(deadline);
}





module.exports = {
    getAllDeadlines,
    getSingleDeadline,
    createDeadline,
    deleteDeadline,
    updateDeadline
}