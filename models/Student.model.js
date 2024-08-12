import { request } from "express";
import mongoose from "mongoose";

const studentInfo = new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
    },
    lastName:{
        type: String,
        required:true,
    },
    username:{
        type:String, 
        unique: true,
        required:true,
    },
    password:{
        type:String,
        request:true,
    },
    phoneNumber:{
        type: Number,
        required:true,
    },
    dob:{
        type: Date,
        required:true,
    },
    email:{
        type: String,
        required:true,
    },

})
const Student = mongoose.model("StudentModel", studentInfo)

export default  Student;
