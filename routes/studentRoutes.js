const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        count: students.length,
        students
    });
});

router.delete("/:id", (req,res) => {
    const id = Number(req.params.id);

    if(Number.isNaN(id)){
        return res.status(400).json({
            success : false,
            message : "Id is not valid a number!!!"
        });
    }

    const student = students.find((student) => student.id === id);

    if(!student){
        return res.status(404).json({
            success : false,
            message : "Student not found"
        });
    }

    students = students.filter((student) => student.id !== id);

    return res.status(200).json({
        success : true,
        message : "Student deleted successfully"
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
    const {name, branch, semester} = req.body;

    if(name == null || name.trim() === ""){
        return res.status(400).json({
            success : false,
            message : "Student Name not found"
        });
    }

    if (branch == null || branch.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Student branch is required."
        });
    }

    const sem = Number(semester);

    if(semester == null || Number.isNaN(sem) || sem < 1 || sem > 8){
        return res.status(400).json({
            success : false,
            message : "Semester is not valid!!"
        });
    }

    req.student = {
        name: name.trim(),
        branch: branch.trim(),
        semester: sem
    };

    next();
}

router.patch("/:id", (req, res) => {

   const id = Number(req.params.id);

   const {name, branch, semester} = req.body;

  if (name === undefined &&
    branch === undefined &&
    semester === undefined){
        return res.status(400).json({
            "success": false,
            "message": "At least one field is required."
        })
   };

   const student = students.find(student => student.id === id);


    if(!student){
        return res.status(404).json({
            success : false,
            message : "Student not found"
        });
    }

    if(name !== undefined && name.trim() === ""){
        return res.status(400).json({
            success : false,
            message : "Name is Empty!!"
        });
    ;}

    if(branch !== undefined && branch.trim() === ""){
        return res.status(400).json({
            success : false,
            message : "Branch is Empty!!"
        });
    }

    let sem;
    if(semester !== undefined){
        sem = Number(semester);
        if(Number.isNaN(sem) || sem < 1 || sem > 8){
            return res.status(400).json({
                success : false,
                message : "Semester is not valid!!"
            });
        }
    }

    if (name !== undefined) {
        student.name = name.trim();
    }

    if (branch !== undefined) {
        student.branch = branch.trim();
    }

    if (semester !== undefined) {
        student.semester = sem;
    }


    return res.status(200).json({
        success: true,
        student
    });

});

router.put("/:id", validateStudent, (req, res) => {

   const id = Number(req.params.id);

   const student = students.find(student => student.id === id);


    if(!student){
        return res.status(404).json({
            success : false,
            message : "Student not found"
        });
    }

    Object.assign(student, req.student);

    return res.status(200).json({
        success: true,
        student
    });

});

router.post("/", validateStudent, (req, res) => {

    const id = students.length === 0
    ? 1
    : Math.max(...students.map(student => student.id)) + 1;

    const student = {
        id,
        ...req.student
    };

    students.push(student);

    return res.status(201).json({
        success: true,
        student
    });

});

module.exports = router;