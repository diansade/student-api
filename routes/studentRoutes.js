const express = require("express");

const router = express.Router();

const {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    patchStudent,
    deleteStudent
} = require("../controllers/studentController");

const { validateStudent }= require("../middleware/studentValidation");

router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.post("/", validateStudent, createStudent);
router.put("/:id", validateStudent, updateStudent);
router.patch("/:id", patchStudent);
router.delete("/:id", deleteStudent);



module.exports = router;