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
                currentemail: user.email
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

viewallcars = () => {
    return db.Vehicle.find().then(result => {
        if (result) {
            return {
                message: result,
                status: true,
                statusCode: 200
            }
        }
        else {
            return {
                message: "error found",
                status: false,
                statusCode: 404
            }
        }
    })
}
getvehicle = (id) => {
    return db.Vehicle.findOne({ carid: id }).then(result => {
        if (result) {
            return {
                message: result,
                status: true,
                statusCode: 200
            }
        }
        else {
            return {
                message: "Couldnt find the vehicle based on id",
                status: false,
                statusCode: 404
            }
        }
    })
}

transaction = (id) => {
    return db.Vehicle.findOne({ carid: id }).then(result => {
        if (result) {
            return {
                message: result,
                status: true,
                statusCode: 200
            }

        }
        else {
            return {
                message: "couldnt find the vehicle based on id",
                status: false,
                statusCode: 404
            }

        }
    })
}

//checkout

checkout = (id, dates, email, fromdate, todate, totalprice, carname, carimage) => {
    return db.Vehicle.findOne({ carid: id }).then(result => {
        if (result) {

            return db.User.findOne({ email }).then(user => {
                if (user) {

                    result.booking.push(dates.split(","))
                    result.save()
                    user.orders.push(
                        {
                            fromdte: fromdate,
                            todte: todate,
                            tprice: totalprice,
                            carnme: carname,
                            carimg: carimage
                        }

                    )
                    user.save()

                    return {
                        message: "success",
                        status: true,
                        statusCode: 200
                    }


                } else {

                    return {
                        message: "user not found",
                        status: false,
                        statusCode: 404
                    }

                }
            })




        }

        else {
            return {
                message: "car not found",
                status: false,
                statusCode: 404
            }
        }

    })
}

checkdate=(date)=>{
    return db.Vehicle.booking
}

module.exports = {
    register, login, viewallcars, getvehicle, transaction, checkout
}