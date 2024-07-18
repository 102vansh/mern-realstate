const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/realstate-db" ,{
   // useUnifiedTopology:true,
   // useNewUrlParser:true
}).then(() => {
    console.log("connection succeful")
}).catch((e) => {
    console.log(e)
})
