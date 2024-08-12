import Student from "../models/Student.model.js";
import bcrypt from "bcrypt"

export const addStudent = async(req, res) => {
    try
    {
        const {firstName, lastName, username, PhoneNumber, Password, dateofbirth, email} = req.body;
        const phoneNumber = parseInt(PhoneNumber)
        const password = await bcrypt.hash(Password, 10)   
        const dob = new Date(dateofbirth)
        
        
        const addStudent = new Student({
            firstName, lastName, username, password, phoneNumber, dob, email
        }) 
        const insertStudent = await addStudent.save();
        console.log(`Student ${firstName} ${lastName} has been added`)
        res.status(200).json(insertStudent)
        
    }
    catch{
        console.log(Error)
    }

}
export const updateStudent = async(req, res) => {
    try {
        const {firstName, lastName, username,phoneNumber, Newpassword,CurrentPassword, dob, email} = req.body;
        const updateField = {};
        if (firstName) updateField.firstName = firstName
        if (lastName) updateField.lastName = lastName;
        if (username) updateField.username = username;
        if (phoneNumber) updateField.phoneNumber = parseInt(phoneNumber);
        if (dob) updateField.dob = new Date(dob);
        if (email) updateField.email = email;
        console.log(updateField)
        const {id} = req.params;
        if(Newpassword){

        const password = await bcrypt.hash(Newpassword, 10)
        updateField.password = password;
        const student = await Student.findOne({id:id})
        const isValid = await bcrypt.compare(CurrentPassword, student.password)
        
        if(!isValid){
            res.status(400).json({message:'Wrong current passwod'})
        }
        else{
            const updateStudent = await Student.findByIdAndUpdate(id,updateField, {new:true});
            if(!updateStudent){
                console.log("Student detail has not been updated")
            }
            else{
                
                console.log(`Student detail has been updated ${updateStudent}`)
            }
            res.status(200).json(updateStudent)
        }
        
        }

    }
    catch{  
        console.log("Error")
    }
}
export const getStudent = async(req, res) => {
    try{
        const {id} = req.params;
        if(id == null){
            const getStudent = await Student.find();
            console.log(getStudent)
            res.json(getStudent)
        }
        else{
            const getStudentbyID = await Student.findById(id)
            if(!getStudentbyID){
                console.log("Does not find id")
            }
            else{
                console.log(`FirstName:${getStudentbyID.firstName}`)
            }
            const dateofbirth = new Date(getStudentbyID.dob)
            console.log(dateofbirth)
            res.json({
                "FirstName":getStudentbyID.firstName,
                "LastName":getStudentbyID.lastName,
                "Username":getStudentbyID.username,
                "PhoneNumber":getStudentbyID.phoneNumber,
                "Date of Birth":dateofbirth,
                "Email":getStudentbyID.email
            })
        }
    }
    catch{
        console.log(Error)
    }
}
export const deleteStudent = async(req, res) => {
    try{
        const {id} = req.params;
        if(id == null){
            console.log("Id did not found")
        }
        else{
            const {CurrentPassword} = req.body;
            const student = await Student.findOne({id:id})
            const isValid = await bcrypt.compare(CurrentPassword, student.password)
            if(isValid === true){
                const deleteStudent = await Student.findByIdAndDelete(id);
                res.json({message: `Task has been deleted`, task: deleteStudent})
            }
            else{
                res.json({message: "Incorrect passwod"})
            }
            
        }
        
    }
    catch{
        console.log(Error)
    }
}
export const loginStudent = async(req, res) =>{
    try{
        const {username} = req.body;
        const {password} = req.body;

        const student = await Student.findOne({username:username})
        if(!student){
            res.json({message:"Username or passwod error"})
        }
        else{
            const isValid = await bcrypt.compare(password, student.password)
            if(isValid === true){
                res.json({message:"You are loggedin"})
            }
            else{
                res.json({message:"Username or password error"})
            }
        }
    }
    catch{
        console.log(Error)
    }
}