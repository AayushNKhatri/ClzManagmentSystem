import { Router } from "express";

import{
    addStudent,deleteStudent,getStudent,updateStudent,loginStudent
}from "../controllers/Student.controller.js"
const router = Router();

router.post("/Register", addStudent)
router.put("/UpdateInformation/:id", updateStudent)
router.delete("/DeleteInformation/:id", deleteStudent)
router.get("/ViewInformation/:id", getStudent)
router.post("/Login", loginStudent)

export default router;
