const mongoose=require('mongoose')

mongoose.connect('mongodb://heroku_q41v1ffq:7hpf9ldk5stl05lmgndpdtf95i@dbh10.mlab.com:27107/heroku_q41v1ffq',{useNewUrlParser: true,useUnifiedTopology:true})
const connection=mongoose.connection

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function() {
    console.log("connection established to database")
});
