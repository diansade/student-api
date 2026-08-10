const express = require("express");

const router = express.Router();

let students = [
    {
        id: 1,
        name: "Dibakar",
        branch: "CSE",
        semester: 5
    },
    {
        id: 2,
        name: "Rahul",
        branch: "ECE",
        semester: 5
    }
];

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        count: students.length,
        students
    });
});


router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(student => student.id === id);
    
    if(!student){
        return res.status(404).json({
            success : false,
            message : "Student not found"
        });
    }

    return res.status(200).json({
        success : true,
        student
    });
});

function validateStudent(req, res, next) {
    // Validate name
    // Validate branch
    // Validate semester

    next();
}

router.post("/", validateStudent, (req, res) => {
    const {name, branch, semester} = req.body;

    const id = students.length === 0
    ? 1
    : Math.max(...students.map(student => student.id)) + 1;

    const student = {
        id,
        name,
        branch,
        semester
    };

    students.push(student);

    return res.status(201).json({
        success: true,
        student
    });

});

module.exports = router;