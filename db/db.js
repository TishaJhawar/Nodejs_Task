// // //DB CONNECTION
require('dotenv').config();
const mongoose=require("mongoose");
// // const { MongoClient } = require('mongodb');

// //  const uri = process.env.DATABASE_URL; 
// //  const client = new MongoClient(uri)
// //   async function run() { try { await client.connect()
// //      const db = client.db('sample_mflix')
// //   const collection = db.collection('users')
// //   console.log("Connected to database!");

// //   //Crud operations 
// //   //Create user
// // //   const newUser = { name: "John", email: "ddddddhc@Jhdchd.com"};
// // //   const result = await collection.insertOne(newUser);
// // //   console.log(result);
  
// // //Read user
// // //   const user = await collection.findOne({ name: "John" });
// // //   console.log(user);

// // //Read all data 
// // //   const first = await collection.findOne()
// // //   console.log(first)

// // //update user 
// // // const filter = { name: "John" };
// // // const update = { $set: { age: 31 } };
// // // const updatedUser = await collection.updateOne(filter, update);
// // // console.log(updatedUser);

// // //DELETE USER 
// // // const deleteResult = await collection.deleteOne({ name: "John" });
// // // console.log(deleteResult);

// //  } finally { 
// //  } } run().catch(console.error)
// mongoose.set('strictQuery', false)
// mongoose.connect(process.env.DATABASE_URL)
//  .then(() => {
// console.log('Database connected.')
//  })
//  .catch((err) => {
//   console.log(err)
//  })
mongoose.set('strictQuery', false)
mongoose.connect(process.env.DATABASE_URL)
 .then(() => {
console.log('Database connected.')
 })
 .catch((err) => {
  console.log(err)
 })
