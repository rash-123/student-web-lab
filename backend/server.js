const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const { v4: uuidv4 } = require("uuid");

const PORT = 8081;

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Rashmi@410",
    database: "crud",
});
db.connect((err) => {
    if (err) {
        console.error("Error connecting to database:", err);
        return;
    }
    console.log("DB is Connected");
});

// Get all Employees
app.get("/", (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

// Get Student by Id
app.post("/getStudentById", (req, res) => {
    let id = req.body.id;
    const sql = "SELECT * FROM student where ID = ?";
    db.query(sql, [id], (err, data) => {
        if (err) return res.json("Error");
        else return res.json(data);
    });
});

// INSERTING DATA
app.post("/create", (req, res) => {
    const sql = "INSERT INTO student SET ?";

    const values = {
        id: uuidv4(),
        name: req.body.name,
        email: req.body.email,
    };
    db.query(sql, values, (err, data) => {
        if (err) return res.json("error");
        return res.json(data);
    });
});

// UPDATING DATA
app.put("/update/:id", (req, res) => {
    const sql = "UPDATE student SET Name = ? ,Email = ? Where ID = ?";
    var values = {
        name: req.body.name,
        email: req.body.email,
    };
    var id = req.params.id;

    console.log(values.name + "  " + values.email + " " + values.id);

    db.query(sql, [values.name, values.email, id], function (error, data) {
        if (error) return res.json(error);
        console.log("Record updated!");
        return res.json(data);
    });
});

// DELETION OF THE DATA
app.delete("/student/:id", (req, res) => {
    const sql = "DELETE FROM student where ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) return res.json("error");
        return res.json(data);
    });
});

// Start the Server
app.listen(PORT, () => {
    console.log("Server Listening on PORT", `${PORT}`);
});
