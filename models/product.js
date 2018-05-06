var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Product 
var ProductSchema = new Schema({
  productName: {
    type: String
  },
  price: {
    type: Number
  },
  imageUrl: {
    type: String
  },
  enabled: {
    type: Boolean,
    default :true
  }
},{
    collection: 'products'
});


//Define collection and schema for cart

var CartSchema = new Schema({
  productName: {
    type: String
  },
  price: {
    type: Number
  },
  imageUrl: {
    type: String
  },
  productId:{
    type:String
  }
},{
    collection: 'carts'
});

var Product=mongoose.model('Product', ProductSchema);
var Cart= mongoose.model('Cart', CartSchema);

module.exports = {Product,Cart};
