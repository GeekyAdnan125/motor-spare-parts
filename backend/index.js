const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const dbconnection = require('./config/database');
const bodyParser = require('body-parser');
const router = require('./router/user_routes');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 5000; // Fix: Set a default port

// Middleware
app.use(cors()); // Fix: Enable CORS
app.use(bodyParser.json());
app.use(cookieParser());

// Mount the API routes
app.use('/api/v1', router);

app.get('/', (req, res) => {
    res.send("This is the default route for testing.");
});

// Start the server
app.listen(port, () => {
    console.log("Server is running on port:", port);
});
 
dbconnection();