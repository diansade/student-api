const express = require("express");

const app = express();

app.use(express.json());

const studentRoutes = require("./routes/studentRoutes");

app.use("/students", studentRoutes);

app.get("/", (req, res) => {
    res.send("Student API");
});

app.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

const { errorHandler } = require("./middleware/errorHandler");

app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});