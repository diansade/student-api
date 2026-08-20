const Student = require("../models/Student");

const getAllStudents = async (req, res, next) => {
    try {
        const students = await Student.find();

        return res.status(200).json({
            success: true,
            count: students.length,
            students
        });
    } catch (error) {
        next(error);
    }
};

const getStudentById = async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id);

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

    } catch (error) {
        next(error);
    }
};

const createStudent = async (req, res, next) => {
    try {
        const student = await Student.create(req.student);

        return res.status(201).json({
            success: true,
            student
        });
    } catch (error) {
        next(error);
    }
};

const updateStudent = async (req, res, next) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.student,
            {
                new: true,
                runValidators: true
            }
        );

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

    } catch (error) {
        next(error);
    }
};

const patchStudent = async (req, res, next) => {
    try {
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

        if (name !== undefined && name.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Name cannot be empty."
            });
        }

        if (branch !== undefined && branch.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Branch cannot be empty."
            });
        }

        if (semester !== undefined) {
            const sem = Number(semester);

            if (Number.isNaN(sem) || sem < 1 || sem > 8) {
                return res.status(400).json({
                    success: false,
                    message: "Semester must be between 1 and 8."
                });
            }
        }

        const updates = {};

        if (name !== undefined) {
            updates.name = name.trim();
        }

        if (branch !== undefined) {
            updates.branch = branch.trim();
        }

        if (semester !== undefined) {
            updates.semester = Number(semester);
        }

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            updates,
            {
                new: true,
                runValidators: true
            }
        );

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

    } catch (error) {
        next(error);
    }
};

const deleteStudent = async (req, res, next) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Student deleted successfully",
            student
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    patchStudent,
    deleteStudent
};