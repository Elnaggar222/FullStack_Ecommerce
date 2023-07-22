const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/createCart", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/updateCart/:id", verifyTokenAndAuthorization, async (req, res) => { // ID of User Who Own This Cart not Cart
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id, // error here 
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/deleteCart/:id", verifyTokenAndAuthorization, async (req, res) => { // ID of User Who Own This Cart not Cart
  try {
    await Cart.findByIdAndDelete(req.params.id); // error here 
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/findUserCart/:id", verifyTokenAndAuthorization, async (req, res) => { // ID of User Who Own This Cart not Cart
  try {
    const cart = await Cart.findOne({ userId: req.params.id }); // (findOne) => each user has only one Cart
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/getAllCarts", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;