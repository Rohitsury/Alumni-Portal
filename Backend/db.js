const mongoose = require("mongoose");
const DBURL = 'mongodb+srv://Alumni:Alumni@cluster0.iryinl4.mongodb.net/Alumni?retryWrites=true&w=majority'
const ConnMongo = async () => { 
    try{
        await mongoose.connect(DBURL, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("Succesfull connect DataBase");
    }catch(err)
    {
        console.error("Error connecting to DataBase:",err);
        }
};
 module.exports = ConnMongo;