const express = require('express');
const connection = require('./dbconnection');
const bodyParser = require('body-parser');
const env = require('dotenv');
const PORT  = process.env.PORT || 3000

const user = require('./routes/userRoutes')

const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());   //specify bodyparser to handle json data

app.use('/user',user);

app.get('/',(req,res)=>{
    res.send('Hello from server')
})

app.listen(PORT, ()=>{
    console.log(`Server running on localhost ${PORT}`);
})