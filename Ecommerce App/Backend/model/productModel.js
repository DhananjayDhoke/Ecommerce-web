const mongoose  = require("mongoose");



const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product Name"],//if name is not provided then this message show
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter Product Description"]
        
    },
    price:{
        type:Number,
        required:[true,"Please Enter Product price"],
        maxlength:5
    },
    ratings:{
        type:Number,
        default:0,
        min:0,
        max:5
    },
    images:[
        {
            
                public_id:{
                 type:String,
                 required:true
                },
                url:{
                 type:String,
                 required:true
                }
             }
        
    ],
    category:{
        type:String,
        required:true  
    },
    stock:{
        type:Number,
        required:[true,"Enter the stock"]
    },
    numofReviews:{
        type:Number,
        default:0
    },
    reviews:[{
       name:{ type:String,required:true},
       rating:{ type:Number,required:true,min:0,max:5},
       comment:{ type:String,required:true},
       user:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
        
    },

    }],
    createdAt:{
       type:Date,
       default:Date.now() 
    }
})

module.exports = mongoose.model("Product",productSchema)

