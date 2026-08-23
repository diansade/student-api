const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },

    branch: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        maxlength: 20
    },

    semester: {
        type: Number,
        required: true,
        min: 1,
        max: 8
    }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;