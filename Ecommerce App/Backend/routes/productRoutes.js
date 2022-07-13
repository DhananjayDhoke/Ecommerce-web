const express = require ("express")
const { getAllProduct,createProduct,updateProduct, deleteProduct,
     getProductDetails, createProductReview, getProductReview, deleteReview } = require("../controller/productController")

const { isAuthenticate,authorizeRole } = require("../midleware/authenticate")

 const router = express.Router()
 
 router.route("/admin/products").get( getAllProduct)
 router.route("/admin/products/new").post(isAuthenticate,authorizeRole("admin"),createProduct)
 router.route("/admin/products/:id").put(isAuthenticate,authorizeRole("admin"),updateProduct)
 .delete(isAuthenticate,authorizeRole("admin"),deleteProduct)

 router.route("/products/:id").get(getProductDetails)

 router.route("/review").put(isAuthenticate,createProductReview)

 router.route("/reviews").get(getProductReview).delete(isAuthenticate,deleteReview)



 


 module.exports = router