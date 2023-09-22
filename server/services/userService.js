const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const dayjs = require('dayjs');
const auth = require('../middlewares/authentication');

exports.checkPhoneAvailability = async (phone) => {
    let result = await userModel.checkPhoneAvailability(phone);
    return result;
}

exports.checkEmailAvailability = async (email) => {
    let result = await userModel.checkEmailAvailability(email);
    return result;
}

exports.addUser = async (user) =>{
    let emailPhoneAvailability = await userModel.checkEmailOrPhoneAvailability(user.email, user.phone);
    if (emailPhoneAvailability){
        let userNew;
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(user.user_password , salt);
        userNew = {
            first_name : user.first_name, 
            last_name : user.last_name, 
            phone : user.phone,
            email : user.email, 
            user_password : hash, 
            created_at : dayjs().format('YYYY-MM-DD HH:mm:ss')
        }
        console.log(userNew)
        let result = await userModel.saveUser(userNew);
        if (result === 1){
            return true;
        }
        else{
            throw new Error('Internal Error');
        }
    }else{
        throw new Error('User Exists');
    }
    
}


exports.loginUser = async (userLogin) => {
    let result = await userModel.getUser(userLogin.email, userLogin.phone);
    if (result[0].user_password != null) {
         let isSamePassword = await bcrypt.compare(userLogin.user_password, result[0].user_password);
         if (isSamePassword) {
            let loggedUser;
            let accessToken = auth.signToken(result[0].email)
            loggedUser = {
                first_name : result[0].first_name, 
                last_name : result[0].last_name, 
                phone : result[0].phone,
                email : result[0].email, 
                token : accessToken 
            }
            return loggedUser;
         }
         else {
            throw new Error('Invalid Login');
         }
    }else{
        throw new Error('Invalid Login');
    }
}
