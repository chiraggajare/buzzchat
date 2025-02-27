const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();



async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
        })

        console.log(`Mongo db connected ===============>  ${conn.connection.host}`);
    } catch (error) {
        console.log("Error: ", error)
        process.exit();
    }
}

module.exports = connectDB;


