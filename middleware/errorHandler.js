const errorHandler = (err, req, res, next) => {

    console.error(err);

    // Invalid MongoDB ObjectId
    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid student ID"
        });
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map(
            error => error.message
        );

        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: messages
        });
    }

    // Unknown error
    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
};

module.exports = {
    errorHandler
};