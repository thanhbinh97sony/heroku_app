const mongoose = require('mongoose');
const config = require('config')
const db = config.get('mongoURL')

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
        
        })
        console.log("Ket noi DB thanh cong")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

module.exports = connectDB