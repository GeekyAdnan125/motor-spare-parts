const mongoose = require('mongoose');

const dbconnection  = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Data base is connected succesfully");
    })
    .catch((err)=>{
        console.log("Error while the connection of database" , err);
        process.exit(1);
    })
}

module.exports = dbconnection;