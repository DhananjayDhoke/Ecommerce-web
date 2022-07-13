

const Product = require("../model/productModel")
const ApiFeatures = require("../utils/apiFeatures")


// create products only admin
exports.createProduct = async (req,res,next)=>{
     
   req.body.user =req.user.id
   const product = await Product.create(req.body)

   res.status(201).send({
      success:true,
      product
   })
}

// get product details 

exports.getProductDetails = async(req,res,next)=>{

   let product = await Product.findById(req.params.id)
   
  if(!product){
  return res.status(500).send({
      success:"fail",
      message:"product not found"
   })
  }

   

   res.status(201).send({
      success:true,
      product
   })
}

exports.getAllProduct = async(req,res,next)=>{


   const productCount = await Product.countDocuments()
   const resultPerPage = 5;
   const apiFeatures = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage)
   const product = await apiFeatures.query

   res.status(201).send({
      success:true,
      product,
      productCount
   })
}

// update  products ---only admin 

exports.updateProduct = async(req,res,next)=>{

   let product = await Product.findById(req.params.id)
   
  if(!product){
  return res.status(500).send({
      success:"fail",
      message:"product not found"
   })
  }

   product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})

   res.status(201).send({
      success:true,
      product
   })
}


// delete
exports.deleteProduct = async(req,res,next)=>{

   let product = await Product.findById(req.params.id)
   
  if(!product){
  return res.status(500).send({
      success:fail,
      message:"product not found"
   })
  }

    await product.remove()

   res.status(201).send({
      success:true,
      product
   })
}

// product review 

exports.createProductReview = async(req,res,next)=>{
   const {rating,comment,productId} =req.body;
   
   const review ={
      user:req.user._id,
      name :req.user.name,
      rating:Number(rating),
      comment,
   }

   const product = await Product.findById(productId);
   
   const isReviewed = product.reviews.find((rev)=>rev.user.toString()===req.user._id.toString())

   if(isReviewed){
      product.reviews.forEach((rev)=>{
         if(rev.user.toString()===req.user._id.toString()){
            rev.rating = rating;
            rev.comment = comment;
         }
      })
   }
   else{
      product.reviews.push(review);
      product.numofReviews = product.reviews.length;
   }
   let avg = 0;
   product.reviews.forEach((rev)=>{
      avg+= rev.rating;
   })
   product.ratings = avg/product.reviews.length;

   await product.save({validateBeforeSave : false});

   res.status(201).send({
      success:true,
   
   })
}

// get all review of product 

exports.getProductReview = async(req,res,next)=>{

   let product = await Product.findById(req.query.id)
   
  if(!product){
  return res.status(404).send({
      success:false,
      message:"product not found"
   })
  }

   res.status(201).send({
      success:true,
      reviews:product.reviews,
   })
}

// delete review

exports.deleteReview = async(req,res,next)=>{

   let product = await Product.findById(req.query.productId)
   
  if(!product){
  return res.status(404).send({
      success:fail,
      message:"product not found"
   })
  }
  
  const reviews = product.reviews.filter((rev)=>rev._id.toString() !== req.query.id.toString())

   let avg= 0;
   reviews.forEach((rev)=>{
      avg+=rev.rating;
   });

   const ratings = avg / reviews.length;
   const numofReviews = reviews.length;

   await Product.findByIdAndUpdate(req.query.productId,{
      reviews,
      ratings,
      numofReviews,
   },{new:true,runValidators:true,useFindAndModify:false})

   res.status(201).send({
      success:true,
      
   })
}