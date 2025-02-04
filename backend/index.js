const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT;
app.get('/' , (req , res) => {
    res.send("This is the default route for testing ");
})
app.listen(port ,()=>{
    console.log("Server is running on the port number" ,port);
})

