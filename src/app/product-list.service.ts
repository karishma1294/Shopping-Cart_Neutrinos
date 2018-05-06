import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductListService {

  constructor(private http: HttpClient) {}


  getProductList() {
    const uri = 'http://localhost:4000/products';
    return this
            .http
            .get(uri)
            .map(res => {
              return res;
            });
  }

  addProduct(product) {
    const uri = 'http://localhost:4000/products/add' + "/"+ product._id;
    const obj = {
      productName: product.productName,
      price: product.price,
      imageUrl: product.imageUrl
    };
    console.log("qjhwjdad");
    return this
      .http
      .post(uri, obj).map(res=>{
        return res;
      })

  }

  deleteProduct(product) {
    const uri = 'http://localhost:4000/products/update'+"/" + product._id;

        return this
            .http
            .delete(uri)
            .map(res => {
              return res;
            });
  }

}
