

const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/CarRental", { useNewUrlParser: true })

const User = mongoose.model("User",
  {
    email: String,
    nme: String,
    phone: Number,
    psw: String,
    orders: []
  })

const Vehicle = mongoose.model("Vehicle",
  {
    carid: Number,
    carnme: String,
    model: String,
    price: Number,
    carimge: String,
    fuel: String,
    transmission: String,
    capacity: Number,
    mileage: Number,
    condition: String,
    booking: []

  })

module.exports = {
  User, Vehicle
}


