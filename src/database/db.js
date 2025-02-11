const mongoose = require('mongoose')

const connectDatabase = () => {
    console.log("Wait connecting to the database")

    mongoose.connect("mongodb+srv://root:pkBRqSP1pbo3pnp9@cluster0.crpls.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("DB connected"))
    .catch((error) => console.log("Error connected", error))
}

module.exports = connectDatabase