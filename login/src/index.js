const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require("./config");

const app = express();
//convert data into json format
app.use(express.json());

app.use(express.urlencoded({extended: false}));

//Use ejs as the view engine
//Routes
app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get("/", (req, res) =>{
    res.render("home");

})
app.get("/signup", (req, res) =>{
    res.render("signup");
})

app.get("/login", (req, res) =>{
    res.render("login");
})

app.get("/home", (req, res) =>{
    res.render("home");
})
//End routes




//register user for signup
app.post("/signup", async (req, res) =>{

    const data = {
        name: req.body.username,
        password: req.body.password
    }

    //check if user already exists in the database
    const existingUser = await collection.findOne({name: data.name});
    if(existingUser){
        res.send("Username already exists! Please choose another username.")
    }
    //otherwise insert user data into database
    else{
        //hash the password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        //set password to hashed password
        data.password = hashedPassword;

        const userdata = await collection.insertMany(data);
        console.log(userdata);

        //send to app page
        res.render("app");
    }
})

//for users logging in
app.post("/login", async (req, res) => {
    try{
        //check username in database
        const check = await collection.findOne({name: req.body.username});
        if(!check){
            return res.send("Username not found!");
        }

        //check hashed password in database with the plain text passsword
        const isPasswordMatched = await bcrypt.compare(req.body.password, check.password);
        if(!isPasswordMatched){
           return res.send("Wrong password!");
        }
        //successful login, send to app page
        else{
            return res.render("app");
        }
    }

    catch{
        console.log("Error in login");
    }

});




//run on local host port 5000
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on Port: $(port)`);

})