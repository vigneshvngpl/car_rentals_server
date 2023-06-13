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

transaction = (id, date) => {
    return db.Vehicle.findOne({ carid: id }).then(result => {
        if (result) {

            // const bookingDates = result.booking;

            // const dateArray = date[0].split(',');

            // const foundDate = dateArray.some(dateString => bookingDates.includes(dateString));


            //     if (foundDate) {
            //         return {
            //             message: "the date is reserved",
            //             status: false,
            //             statusCode: 404
            //         }
            //     }
            //     else {
            //         return {
            //             message: "notfound",
            //             status: true,
            //             statusCode: 200
            //         }
            //     }

            return {
                message: "successful",
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

checkout = (id, dates, email, fromdate, todate, totalprice, carname, carimage,transmission,fuel,capacity,condition) => {
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
                            carimg: carimage,
                            transmission: transmission,
                            fuel: fuel,
                            capacity: capacity,
                            condition: condition
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

checkdate = (id, date) => {
    return db.Vehicle.findOne({ carid: id }).then(result => {
        if (result) {




            const flattenedBooking = result.booking.flat();
            const foundDate = date.find(date => flattenedBooking.includes(date));

            if (foundDate) {
                return {
                    message: "found",
                    status: true,
                    statusCode: 200
                }
            }
            else {
                return {
                    message: "notfound",
                    status: false,
                    statusCode: 404
                }
            }


        }
        else {
            return {
                message: "car id not found",
                status: false,
                statusCode: 404
            }
        }
    })
}

orderhistory = (id) => {
    return db.User.findOne({ email: id }).then(result => {
        if (result) {
            return {
                message: result.orders,
                status: true,
                statusCode: 200
            }

        }
        else {
            return {
                message: "no user found",
                status: false,
                statusCode: 404
            }
        }
    })
}

//admin login logic


adminlogin = (user, psw) => {
    return db.Admin.findOne({ user, psw }).then(result => {

        if (result) {


            return {
                message: "welcome back",
                status: true,
                statusCode: 200,
                currentAdmin: result.user
                
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

//vehicle add
vehicleadd = ( carid,carnme,model,price,carimge,fuel,transmission,capacity,mileage,condition) => {

    return db.Vehicle.findOne({ carid:carid }).then(Vehicle => {
        if (Vehicle) {

            return {
                message: "carid already in use ",
                status: false,
                statusCode: 404
            }

        }
        else {
            Vehicle = new db.Vehicle({
                carid,
                carnme,
                model,
                price,
                carimge,
                fuel,
                transmission,
                capacity,
                mileage,
                condition,
                booking:[]

            })

            Vehicle.save()
            return {
                message: "registration Successful",
                status: true,
                statusCode: 200
            }
        }
    })
}




module.exports = {
    register, login, viewallcars, getvehicle, transaction, checkout, checkdate, orderhistory,adminlogin,vehicleadd
}