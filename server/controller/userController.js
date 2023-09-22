const userService = require('../services/userService');

exports.checkEmailAvailability = async (req, res) => {
    try {
        const isEmailNotExists = await userService.checkEmailAvailability(req.query.email);
        return res.status(200).json({
            status: {
                code: 200,
                name: 'SUCCESS',
                message: 'Successfully_Validated' 
            },
            payload: isEmailNotExists
        });;
    } catch (error) {
        return res.status(500).json({
            status: {
                code: 500,
                name: 'ERROR',
                message: 'Validation_Error' 
            },
            payload: null
        });
    }
}


exports.checkPhoneAvailability = async (req, res) => {
    try {
        const isPhoneNotExists = await userService.checkPhoneAvailability(req.query.phone);
        return res.status(200).json({
            status: {
                code: 200,
                name: 'SUCCESS',
                message: 'Successfully_Validated'
            },
            payload: isPhoneNotExists
        });;
    } catch (error) {
        return res.status(500).json({
            status: {
                code: 500,
                name: 'ERROR',
                message: 'Validation_Error' 
            },
            payload: null
        });
    }
}



exports.addUser = async (req, res) => {
    try {
        console.log(req.body)
        const add_user = await userService.addUser(req.body);
        console.log(add_user)
        if (add_user) {
            return res.status(200).json({
                status: {
                    code: 200,
                    name: 'SUCCESS',
                    message: 'Success_Adding_User'
                },
                payload: true
            });;
        } else {
            throw new Error("Failed to add user");
        }
    } catch (error) {
        if (error.message == "User Exists") {
            return res.status(500).json({
                status: {
                    code: 500,
                    name: 'ERROR',
                    message: 'User_Already_Exists'
                },
                payload: null
            });
        } else {
            return res.status(500).json({
                status: {
                    code: 500,
                    name: 'ERROR',
                    message: 'Internal_Error' 
                },
                payload: null
            });
        }
    }
}


exports.loginUser = async (req, res) => {
    try {
        const login_user = await userService.loginUser(req.body);
        if (login_user) {
            return res.status(200).json({
                status: {
                    code: 200,
                    name: 'SUCCESS',
                    message: 'Login_Successful'
                },
                payload: login_user
            });;
        } else {
            throw new Error("Login Falied");
        }
    } catch (error) {
        if (error.message == "Invalid Login") {
            return res.status(500).json({
                status: {
                    code: 401,
                    name: 'ERROR',
                    message: 'Invalid Credintials'
                },
                payload: null
            });
        } else {
            return res.status(500).json({
                status: {
                    code: 500,
                    name: 'ERROR',
                    message: 'Internal_Error'  + error
                },
                payload: null
            });
        }
    }
}