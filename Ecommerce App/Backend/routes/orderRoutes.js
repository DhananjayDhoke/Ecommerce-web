
const express = require("express");
const { newOrder, getSingalOrder, myOrders, getAllOrder, updateOrder, deleteOrder } = require("../controller/oderController");
const { isAuthenticate, authorizeRole } = require("../midleware/authenticate");

const router = express.Router();


router.route("/order/new").post(isAuthenticate,newOrder)
router.route("/order/:id").get(isAuthenticate,getSingalOrder)
router.route("/order").get(isAuthenticate,myOrders)

// admin routes

router.route("/admin/order").get(isAuthenticate,authorizeRole("admin"),getAllOrder)
router.route("/admin/order/:id").put(isAuthenticate,authorizeRole("admin"),updateOrder)
.delete(isAuthenticate,authorizeRole("admin"),deleteOrder);










module.exports= router;

