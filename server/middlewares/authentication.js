require('dotenv').config()
const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token ==null){
        return  res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, response)=>{

        if(err){
            return res.sendStatus(403);
        }
        res.locals = response; 
        console.log(response) //if no error
        next()
    })
}

function signToken(response){
    
    const accessToken = jwt.sign( {response : response},process.env.ACCESS_TOKEN,{expiresIn:'8h'})
    console.log(accessToken)
    return accessToken;
}


module.exports = {authenticateToken , signToken}