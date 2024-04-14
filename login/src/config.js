const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://krishnai27:Soccer%2F232@budgetapp.ogq5gvp.mongodb.net/login");

//check database connected or not
connect.then(() => {
    console.log("Database connected sucessfully");
})
.catch(() => {
    console.log("Failed to connect to database");
});

//create a schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    password: {
        type: String,
    }
})

//collection part
const collection = new mongoose.model("users", LoginSchema);

//import the model
module.exports = collection;