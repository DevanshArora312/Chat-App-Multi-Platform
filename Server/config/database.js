const mongoose =  require("mongoose");
require("dotenv").config();

const dbConnect = async()=>{
    mongoose.connect(process.env.DB_URL)
    // ,{
    //     useUnifiedTopology : true,
    //     useNewurlParser : true
    // })
    .then(()=>{
        console.log("connected Succesfully ");
    }).catch((error) => {
        console.log("Recieved an error" ,error );
    })
}

module.exports = dbConnect;