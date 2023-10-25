const express = require("express")
const app=express()
const dotenv = require(`dotenv`)
const PORT = 5000
const bodyParser = require('body-parser');
const cors = require('cors')
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

const mongodb = require('./db')
mongodb()

dotenv.config({path:'./config.env'})

app.use(cors());
app.use(express.json())
app.use(require('./routes/home'))
app.use('/student',require('./routes/student'))
app.use('/admin',require('./routes/admin'))
app.use(require('./routes/ForgotPassword'))


app.listen(PORT,()=>{
    console.log(`Server is lesting at port ${PORT}`)
   
})