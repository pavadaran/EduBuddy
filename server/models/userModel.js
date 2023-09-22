const connection = require('../dbconnection')

exports.checkPhoneAvailability = async function (phone) {
    var dbQuery = "SELECT * FROM users  WHERE phone= ?";
    var result = await connection.query(dbQuery, [phone]);
    if (result.length == 0) {
        return true;
    } else {
        return false;
    }
}


exports.checkEmailAvailability = async function (email) {
    var dbQuery = "SELECT * FROM users  WHERE email= ?";
    var result = await connection.query(dbQuery, [email]);
    console.log(result)
    if (result.length == 0) {
        return true;
    } else {
        return false;
    }
}


exports.checkEmailOrPhoneAvailability = async function (email,phone) {
    var dbQuery = "SELECT * FROM users  WHERE email=? OR phone=?";
    var result = await connection.query(dbQuery, [email, phone]);
    if (result.length == 0) {
        return true;
    } else {
        return false;
    }
}

exports.saveUser = async function (user){
    var dbQuery = "INSERT INTO users(first_name, last_name, phone,email, user_password, created_at) VALUES(?,?,?,?,?,?)";
    var result = await connection.query(dbQuery,[user.first_name, user.last_name, user.phone, user.email, user.user_password, user.created_at]);
    console.log('Inserted ' + result.affectedRows + ' rows');
    return result.affectedRows;
}


exports.getUser = async function (email = null,phone = null){
    var dbQuery = "SELECT * FROM users  WHERE email=? OR phone=?";
    var result = await connection.query(dbQuery, [email, phone]);
    if (result.length == 1) {
        return result;
    } else {
        return null;
    }
}


exports.loginUser = async function (user){
    var dbQuery = "SELECT * FROM users  WHERE email= ? AND user_password= ?";
    var result = await connection.query(dbQuery,[user.email, user.user_password]);
    if (result.length == 1) {
        return result;
    } else {
        return null;
    }
} 