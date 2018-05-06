// server.js

const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      config = require('./dbConfig/db'),
      productRoutes = require('./expressRoutes/productRoutes'),
      faker=require("faker"),
      Product=require("./models/product").Product;
      var Cart =require('./models/product').Cart;

mongoose.Promise = global.Promise;
mongoose.connect(config.DB).then(
    () => {
      console.log('Database is connected');
      //Removing data from Product before performing any operation
      Product.remove({},(err,products)=>{
        if(err){
          return console.log("Not able to remove data");
        }
      });
       //Removing data from Cart before performing any operation
       Cart.remove({},(err,carts)=>{
        if(err){
          return console.log("Not able to remove data");
        }
      });
        for(let i =0;i<12;i++){
         var temp={
           "productName": faker.commerce.product(),
           "price": faker.commerce.price(),
           "imageUrl": "https://picsum.photos/200",
         };
         Product.create(temp,(err,products)=>{
           if(err){
             console.log("Unable to create the data")
           }
         });
        }


      },
    err => { console.log('Can not connect to the database'+ err)}
  );

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4000;

app.use('/products', productRoutes);

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});
