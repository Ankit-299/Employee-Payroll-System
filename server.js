const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const employees= require("./employees.json");
app.get("/",(req,res)=>{
    res.render("index.ejs",{employees});
    console.log("hello");
})

// Add Employee
app.get("/add",(req,res)=>{
    res.render("edit.ejs",{employees});
});

// Show Employee

app.post("/post", (req,res)=>{
    let {username , basicSalry}= req.body;
    console.log(username,basicSalary);
})

app.listen(port , ()=>{
    
    console.log(`Server is listining on port${port}`);
})