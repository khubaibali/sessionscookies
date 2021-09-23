

const mongoose = require('mongoose');

function databaseConnection(){

    mongoose.connect('mongodb://localhost:27017/cookiesandsession').then(()=>{
        console.log('Database connection established!');
    }).catch((err)=>{
        console.log('Something went wrong connecting database');
    })
}



module.exports = databaseConnection;






