const mongoose = require('mongoose')
const listSchema = new mongoose.Schema({


    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    userRef:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    address:{
        type:String
    },
    imageUrls:{
        type:Array
    },
    regularprice:{
        type:Number
    },
    discountedprice:{
        type:Number
    },
    bathrooms:{
        type:Number
    },
    bedrooms:{
        type:Number
    },
    furnished:{
        type:Boolean
    },
    parking:{
        type:Boolean
    },
    type:{
        type:String
    },
    offer:{
        type:Boolean
    },
    date:{
        type:Date,
        default:Date.now
    }



}, { timestamps: true })
module.exports = mongoose.model('List', listSchema)