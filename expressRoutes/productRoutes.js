// productRoutes.js

var express = require('express');
var productRoutes = express.Router();

// Require Item model in our routes module
var Product = require('../models/product').Product;
var Cart = require('../models/product').Cart;
var count=0;
//function to count the items in cart

function cartItemCount(){
    Cart.count({},(err,countItems)=>{
        count=countItems;
    });
}

// Defined get data(index or listing) route
productRoutes.route('/').get(function (req, res) {
   Product.find({}, function (err, products){
    if(err){
      console.log(err);
    }
    else {
      var response={};
      cartItemCount();
      response.productData=products;
      response.count=count;
      res.send(response);
    }
  });
});

productRoutes.post('/add/:id',function (req, res) {

    var cart = new Cart(req.body);
    cart["productId"]=req.params.id;
    Cart.create(cart,(err,cartValue)=>{
           if(err){
             console.log("Unable to create the data")
           }
           else{
             cartItemCount();
  Product.findById(req.params.id, function(err, product) {
   if (!product)
     return ('Could not load Document');
   else {

     product.enabled = false;
     product.save().then(product => {
         res.send(product);
     })
     .catch((err) => {
           console.log("unable to update the database");
     });
   }
 });
}
});
});

productRoutes.delete('/update/:id',function (req, res) {

  Cart.remove({"productId" : req.params.id},(err,cart)=>{
    if(err){
       console.log("Error while deleting item from cart");
    }
    else{
      cartItemCount();
      Product.findById(req.params.id, (err, product) => {
       if (!product){
          console.log('Could not load Document');
       }
       else {
         product.enabled = true;
         product.save().then(product => {
             res.send(product);
         })
         .catch(err => {
               console.log("unable to update the database");
         });
       }

  });
    }
});
});

//  Defined update route

module.exports = productRoutes;
