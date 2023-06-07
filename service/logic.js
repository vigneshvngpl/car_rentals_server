//import db

const db = require("./db")



//register logic

register = (email, nme, phone, psw) => {

    return db.User.findOne({ email }).then(user => {
        if (user) {

            return {
                message: "email already in use ",
                status: false,
                statusCode: 404
            }

        }
        else {
            newuser = new db.User({
                email: email,
                nme: nme,
                phone: phone,
                psw: psw,
                orders: []

            })

            newuser.save()
            return {
                message: "registration Successful",
                status: true,
                statusCode: 200
            }
        }
    })
}

//login logic

login = (email, psw) => {
    return db.User.findOne({ email, psw }).then(user => {

        if (user) {


            return {
                message: "welcome back",
                status: true,
                statusCode: 200,
                currentUser: user.nme,
                // token

            }
        }
        else {
            return {
                message: "email or password incorrect",
                status: false,
                statusCode: 404


            }
        }


    })
}

module.exports = {
    register, login
}