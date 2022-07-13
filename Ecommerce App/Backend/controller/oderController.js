
const Order = require("../model/orderModel")
const Product = require("../model/productModel")

// create new order 

exports.newOrder = async (req,res,next)=>{
     
   const {shippingInfo,orderItems,paymentInfo,itemsPrice,
          taxtPrice,shippingPrice,totalPrice} = req.body

    const order = await Order.create({shippingInfo,orderItems,paymentInfo,itemsPrice,
        taxtPrice,shippingPrice,totalPrice,paidAt:Date.now(),user:req.user._id})
 
    res.status(201).send({
       success:true,
       order,
    })
 }

 // get singal order 

 exports.getSingalOrder = async (req,res,next)=>{
    
   const order  = await Order.findById(req.params.id).populate("user","name email");
    
   if(!order){
      return res.status(404).json({message :"Order not Found with id"})
   }
   res.status(201).json({
      success: true,
      order,
   })
 }

 // get logged in user order

 exports.myOrders = async (req,res,next)=>{
    
   
   
   const order  = await Order.find({user:req.user._id});
    
   res.status(201).json({
      success: true,
      order,
   })
 }

 // get all order for -- admin 

 exports.getAllOrder = async (req,res,next)=>{
    
   const order  = await Order.find()
   
   let totalAmount = 0;

   order.forEach((ord)=>{
      totalAmount = totalAmount+ord.totalPrice
   })

  
   res.status(200).json({
      success: true,
      totalAmount,
      order,
   })
 }

 // Upadate order status -- admin

 exports.updateOrder = async (req,res,next)=>{
    
   const order  = await Order.findById(req.params.id)
    
   if(!order){
      return res.status(404).json({message :"Order not Found with id"})
   }
 
   if(order.orderStatus === "Delivered"){
      return  res.status(400).json({
         message: "You have alredy deliver this order"
      })
   }
   
   order.orderItems.forEach(async(ord)=>{
      await updateStock(ord.product,ord.quantity)
   })

   order.orderStatus = req.body.status;

   if(req.body.status === "Delivered"){
      order.delivereAt = Date.now();
   }

   await order.save({validateBeforeSave : false})
   res.status(201).json({
      success: true,
      
   })
 }


 async function updateStock(id,quantity){

   const product = await Product.findById(id)
   product.Stock = product.stock - quantity;

   await product.save({validateBeforeSave:false})
 }

 // delete order for ---admin 
 
 exports.deleteOrder = async (req,res,next)=>{
    
   const order  = await Order.findById(req.params.id)
   
   if(!order){
      return res.status(404).json({message :"Order not Found with id"})
   }
 

   await order.remove();
  
   res.status(200).json({
      success: true,
   })
 }