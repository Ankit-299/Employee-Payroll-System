const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));
let employees= require("./employees.json");
app.get("/",(req,res)=>{
    res.render("index.ejs",{employees});
    
})

// Add Employee
app.get("/add",(req,res)=>{
    res.render("add.ejs",{employees});
});

// Show Employee

app.post("/post", (req,res)=>{
    const {username , basicSalary , gender , department}= req.body;
    const id = Date.now();
    //console.log(username,basicSalary,gender);
    employees.push({
        id:id,
        username:username,
        department:department,
        basicSalary:basicSalary,
        gender:gender
    });
    //console.log(id);
    res.redirect("/");
})

// edit Employee
app.post("/edit/:id/:username",(req,res)=>{
    let {id , username}= req.params;
    //console.log(id);
    res.render("edit.ejs",{id , username});
})

app.patch("/edit/post/:id",(req,res)=>{
    let {id} = req.params;
    let{username , gender , basicSalary , department} = req.body;
    let employee= employees.find((p)=>id == p.id);
     //console.log(id);
     if(employee){
        employee.username = username;
        employee.gender = gender;
        employee.basicSalary=basicSalary;
        employee.department=department;
     }
    
    res.redirect("/");
})

// DELETE EMPLOYEE

app.delete("/delete/:id",(req,res)=>{
    let {id} = req.params;
    console.log(id);
    employees=employees.filter((p)=> p.id !== Number(id) );
    res.redirect("/");
})



app.listen(port , ()=>{
    
    console.log(`Server is listining on port${port}`);
})