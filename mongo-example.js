"use strict";

// const MongoClient = require("mongodb").MongoClient;
const {MongoClient} = require("mongodb"); //ES6
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.log(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // ==> We have a connection to the "test-tweets" db,
  //     starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  db.collection("tweets").find().toArray((err, results) => {
    if (err) throw err;
    console.log("results.toArray:", results);
    db.close();  
  });
});
