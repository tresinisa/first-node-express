const express = require('express');
const app = express();
const customerList = require("./customerList.js");

app.get("/",(req, res)=>{
    res.send('hello world')
})
//excercise 1
app.get("/api/about",(req, res)=>{
    //render out html including image adress//
    res.send(`<h1>I'm Tre</h1><h2>Like my cat?</h2><img src="https://image.petmd.com/files/styles/863x625/public/2023-09/how-smart-are-cats.jpg"/>`)
})
app.get("/api/contact",(req, res)=>{
    res.send("<h1>My details (email📧):</h1><h3>tress@missionreadyhq.com</h3><h1>MY details (phone 📱):</h1><h3>0210738414</h3>")
})

//userList data
const userList = [
    {"name":"Tre", "age":30},
    {"name":"Sam", "age":34},
    {"name":"Kothar", "age":30},
    {"name":"Amaia", "age":4},
    {"name":"Hala", "age":1},
    {"name":"Tayibb", "age":57},
]

app.get('/api/userList', (req, res)=>{
    res.json(userList)
    //always req before res
})

//dynamic route
app.get("/api/userList/:name", (req, res)=>{
    console.log(req.params.name)
    const requestedName = req.params.name;
    const user = userList.find((user)=>user.name.toLowerCase() === requestedName.toLowerCase());

    if(user) {
        res.json(user);
    }else{
        res.status(404).json({error: "user not found"})
    }
    
});









//=======Query Params=========//
app.get('/api/profile', (req, res)=>{

    const searchedName = req.query.name
    const profile = userList.find((user)=>user.name.toLowerCase() === searchedName.toLowerCase());

    if(profile){
        res.json(profile)
    }else{
        res.status(404).json({error: "User not found"});
    }

})









//==============EXCERCISE 2===============//
app.get('/api/customer/:customerId', (req, res)=>{
    const requestedCustomerId = req.params.customerId;

    const customer = customerList.find((customer)=>customer.id === parseInt(requestedCustomerId));

    if(customer){
        res.json(customer);
    }else{
        res.status(404).json({error: `User with id of ${requestedCustomerId} not found`})
    }

});












//=============== PORT ===============//
const PORT = 4000;

app.listen(PORT, () => {console.log(`http://localhost:${PORT}`)})

//===== HANDLING THE ERROR =====//
.on("error", (error)=>{
    console.log(error)
    if(error.code === "EADDRINUSE"){
        console.log('port already in use')
    }else{
        console.log('server error', error)
    }
});
