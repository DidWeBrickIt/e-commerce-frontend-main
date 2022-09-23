import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css']
})
export class DisplayProductsComponent implements OnInit {

  allProducts: Product[] = [];
  hasError:boolean = false;
  errorMessage:string = "Server error, unable to retrieve the products, please try again later";
  searchProducts: Product[] = [];
  searchInput: string = "";

  updatedProductInfo = {
    product:{
      id:0,
      quantity:0,
      price:0,
      description:"",
      image:"",
      name:""
    },
    toggleAcc:false
  };


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (resp) => {
       resp.sort((p1:Product, p2:Product) => p1.name.localeCompare(p2.name));
        this.allProducts = resp;
        this.searchProducts = resp;
      },
      (err) => {
        console.log(err)
        this.hasError = true;
      },
      () => console.log("Products Retrieved")
    );
  }

  recieveBool($event:boolean){
    this.updatedProductInfo.toggleAcc = $event;
  }

  updateCreateProduct(prod:Product){
    //This is where we scroll to top of page
    //We also send the information from the event to the form.
    // console.log(prod);
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });

    this.updatedProductInfo.toggleAcc = true;

    this.updatedProductInfo.product = prod;
  }

  searchProduct(): void {
    this.productService.getProducts();
    this.searchProducts = this.allProducts.filter(p => p.name.toLowerCase().includes(this.searchInput.toLowerCase()));
    this.searchInput = "";
  }
}
