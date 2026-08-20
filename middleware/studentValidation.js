const validateStudent = (req, res, next) => {
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
};

module.exports = {
    validateStudent
};