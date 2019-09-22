const express = require("express");
const body_parser = require("body-parser");
const request = require("request");
const fs = require("fs");

const app = express();
var userInfo = [];

app.use(body_parser.urlencoded({extended:true}));
app.use(express.static("public"));

// Read all users from data base
fs.readFile("./data/users.json", function(error, data)
{
    if(error){
        console.log(error)
    }else{
        usersInfo = JSON.parse(data);
        console.log(usersInfo)
    }
});

app.get("/",function(req,res){
    res.sendfile(__dirname + "/signup.html")
});

app.post("/",function(req,res){

    // take out data from rrequest
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.Email;

    var currUser = {
        fName : firstName,
        lName : lastName,
        email : email
    }

    // Add new user to users list
    usersInfo.push(currUser);

    // update updated usres info to users.json file
    fs.writeFile("./data/users.json", JSON.stringify(usersInfo), function(error){
        if(error){
            console.log(error)
        }else{
            console.log("Success..!")
        }
    });

    res.status(200).send(usersInfo);
});

app.listen(process.env.PORT||3000,function(){
    console.log("server is running on port 3000");
});

//d25364997b73e4b7fde2c69459926a35-us20