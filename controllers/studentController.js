const students = require("../data/students");

const getAllStudents = (req, res) => {
    return res.status(200).json({
        success: true,
        count: students.length,
        students
    });
};

const getStudentById = (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    return res.status(200).json({
        success: true,
        student
    });
};

const createStudent = (req, res) => {
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
};

const updateStudent = (req, res) => {
    
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
};

const patchStudent = (req, res) => {
    const id = Number(req.params.id);

    const { name, branch, semester } = req.body;

    if (
        name === undefined &&
        branch === undefined &&
        semester === undefined
    ) {
        return res.status(400).json({
            success: false,
            message: "At least one field is required."
        });
    }

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    // Validate name
    if (name !== undefined && name.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Name cannot be empty."
        });
    }

    // Validate branch
    if (branch !== undefined && branch.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Branch cannot be empty."
        });
    }

    let sem;

    // Validate semester
    if (semester !== undefined) {
        sem = Number(semester);

        if (Number.isNaN(sem) || sem < 1 || sem > 8) {
            return res.status(400).json({
                success: false,
                message: "Semester must be between 1 and 8."
            });
        }
    }

    // Update only the provided fields
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
};

const deleteStudent = (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "ID must be a valid number."
        });
    }

    const index = students.findIndex(student => student.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    students.splice(index, 1);

    return res.status(200).json({
        success: true,
        message: "Student deleted successfully"
    });
};

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    patchStudent,
    deleteStudent
};