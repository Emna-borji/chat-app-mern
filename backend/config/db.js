const mongoose = require("mongoose")

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongodb connected : ${conn.connection.host}`)
    } catch (error) {
        console.error(
            `Could not connect to mongodb ${error.message}`
        )
    }
}

module.exports = connectDB