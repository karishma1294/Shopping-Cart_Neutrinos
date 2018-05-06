import { Component ,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {ProductListService } from './product-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private productService: ProductListService){

  }
products:any=[];
count: number;

ngOnInit() {
   this.getProducts();

  }
  getProducts():any{
  this.productService.getProductList().subscribe((res)=>{
    this.products=res['productData'];
    this.count=res['count'];
   
  })
}

addProductsToCard(product: any):any{
this.productService.addProduct(product).subscribe((res)=>{
 this.getProducts();
});
}

  deleteProduct(product) {
    this.productService.deleteProduct(product).subscribe(res => {
      this.getProducts();
    });
  }
}