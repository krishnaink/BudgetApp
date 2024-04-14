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
        //Username already exists! Please choose another username.
        return res.render("signup", { error: "Username already exists! \nPlease choose another username." });

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

// for users logging in
app.post("/login", async (req, res) => {
    try {
        // check if the username exists in the database
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            // Username not found error
            return res.render("login", { error: "Username not found" });
        }

        // check hashed password in database with the plain text password
        const isPasswordMatched = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatched) {
            // Wrong password error
            return res.render("login", { error: "Wrong Password" });
        }

        // successful login, send to app page
        return res.render("app");
    } catch (error) {
        console.log("Error in login:", error);
        // Generic error message for server-side errors
        return res.status(500).send("An error occurred during login. Please try again later.");
    }
});





//run on local host port 5000
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on Port: $(port)`);

})