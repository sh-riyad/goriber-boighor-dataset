const express = require('express');
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
require("dotenv").config
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json())
// fontend theke data string e asbe tai json e convert krar jnno
// convert na krle undefined asbe

// console.log(process.env.DB_USER, process.env.DB_PASSWORD)
const uri = "mongodb+srv://goriber-boighor:q0o5rCphbhpN4007@cluster0.tunnlb7.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // locating database and collection
    const bookCollection = client.db("goriber-boighor").collection("books")

    // Add Books theke data read krbe
    app.post("/add-book", async(req,res) =>{
      // receiving data from input field
      const book = req.body;
      // inserting into MongoBD
      const result = await bookCollection.insertOne(book);

      // console.log(req.body)
      res.send(result);
    })

    // API for fetching All books
    app.get("/all-books", async(req,res)=>{
      const result = await bookCollection.find().toArray()
      res.send(result)
    })

    // Read Data Using id for Single Book Details page
    app.get("/all-books/:id", async(req,res) =>{
      const id = req.params.id;
      // console.log(id)
      // finding a single book using findOne() 
      const query ={_id:new ObjectId(id)};
      const result = await bookCollection.findOne(query);
      res.send(result)
    })

    // API for updating single book
    app.put("/update-book/:id" ,async(req,res) =>{
      const id = req.params.id;
      const query ={_id : new ObjectId(id)};
      const UpdatedBookDetails = req.body;
      const updates = {$set:UpdatedBookDetails}

      const result = await bookCollection.updateOne(query,updates);

      res.send(result)
    })

    // API for Deleting single delete data
    app.delete("/delete-book/:id", async(req,res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      // calling deleteOne methon for deleting one value
      const result = await bookCollection.deleteOne(query);
      res.send(result)
    })
  } finally {

  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})