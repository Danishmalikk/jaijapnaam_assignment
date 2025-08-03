const mongoose = require('mongoose')

const connectDb = async () => { 
    try {
        const cnnction = mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
        }).then(()=> console.log("Mongo db connected"))
    } catch (error) {
        console.log("error", error)
    }
}

module.exports = connectDb