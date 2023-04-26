import mongoose from "mongoose";

mongoose.set('strictQuery', true);

/////////////////////////////////////////////////////////////////////////////////////////////////
let dbURI = "mongodb+srv://AMEER:TestingPuprpose@cluster0.boegp.mongodb.net/amazonClone?retryWrites=true&w=majority";
mongoose.connect(dbURI,{useNewUrlParser:true})
////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', () => {
    console.log('mongoos is connected')
});
mongoose.connection.on('disconnected', () => {
    console.log('mongoos is disconnected');
    process.exit(1)
});

mongoose.connection.on('error', (err) => {
    console.log('mongoos connection error' + err)
});

process.on('SIGINT', () => {
    console.log('app is terminating');
    mongoose.connection.close(() => {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});

////////////////mongodb connected disconnected events///////////////////////////////////////////////
