const express = require("express");
const jwt = require("jsonwebtoken");
// const conn = require("../db/db");
require("dotenv").config();
const router = express.Router();
const User = require("../model/users");
const Product = require("../model/product");
const bcrypt = require("bcrypt");

//Post Method
router.get("/post", (req, res) => {
  res.send("Post API");
});

//Get all Method
router.get("/getAll", (req, res) => {
  res.send("Get All API");
});

//Get by ID Method
router.get("/getOne/:id", (req, res) => {
  res.send("Get by ID API");
});

//Update by ID Method
router.patch("/update/:id", (req, res) => {
  res.send("Update by ID API");
});

//Delete by ID Method
router.delete("/delete/:id", (req, res) => {
  let id = req.params.id;
  res.send(`Id ye hai ${id}`);
});
//..........................................................................................................
//..........................................................................................................
//..........................................................................................................

//task 1 node BE
router.post("/register", async (req, res) => {  
  const { id, password, name } = req.body;
  console.log(req.body);

  if (!id || !password || !name) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    // Generate JWT token
    const token = jwt.sign({ id, name }, process.env.ACCESS_TOKEN_SECRET);
    const data = new User(req.body);
    await data.save();
    console.log(data);
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register user" });
  }
});

//task 2 node BE
router.post('/auth', async(req, res) => {
    const { id,password} = req.body;
    const user = await User.findOne({ id });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Incorrect password' });
  }
  // generate JWT token
  const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
  res.send({ user,token});
});


//task 3 node BE
router.post("/addProduct",authenticateToken,async(req, res) => {
    const { name, description, price} = req.body;
    if (!name|| !description || !price) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      try {
        // Get the authenticated user's ID from the JWT token
        const userId = req.user.id;
    console.log(userId);
        // Create a new product associated with the authenticated user
        const product = new Product({
          name,
          description,
          price,
          user: userId,
        });
    // console.log(user);
        // Save the product to the database
        await product.save();
    
        // Return the saved product
        res.send(product);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to store product" });
      }
    });
    function authenticateToken(req, res, next) {
        const authHeader = req.headers["authorization"];
        // console.log("authHeader",authHeader);
        // console.log("req---",req.headers);
        const token = authHeader && authHeader.split(" ")[1];
        // console.log("token",token);
        if (token == null) return res.sendStatus(401);
      
        jwt.verify(token, 'secretKey', async (err, decoded) => {
            // console.log(decoded);
          if (err) return res.sendStatus(403);
      
          // Check if the decoded token contains a valid user ID
          const userId = decoded.id;
          if (!userId) return res.sendStatus(403);
      
          try {
            // Fetch the user from the database
            const user = await User.findById(userId);
            // console.log(user);
            if (!user) return res.sendStatus(403);
      
            // Store the user object in the request for later use
            req.user = user;
      
            // Call the next middleware function
            next();
          } catch (err) {
            console.error(err);
            res.sendStatus(500);
          }
        });
      }
//task 4 node BE
router.delete("/deleteProduct/:id", (req, res) => {
  let id = req.params.id;
  console.log("Dleteing from a specific id ", id);
  //delete from DB Mongodb or sql ----------
});

//task 5 node BE
router.get("/productData/:id", (req, res) => {
  let id = req.params.id;
 
});

module.exports = router;
