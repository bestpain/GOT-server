const mongoose=require('mongoose')

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true,useUnifiedTopology:true})
const connection=mongoose.connection

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function() {
    console.log("connection established to database")
});
