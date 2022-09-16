import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css']
})
export class DisplayProductsComponent implements OnInit {

  allProducts: Product[] = [];
  searchProducts: Product[] = [];
  searchInput: string = "";

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (resp) => {
        this.allProducts = resp;
        this.searchProducts = resp;
      },
      (err) => console.log(err),
      () => console.log("Products Retrieved")
    );
  }

  searchProduct(): void {
    this.productService.getProducts();
    this.searchProducts = this.allProducts.filter(p => p.name.toLowerCase().includes(this.searchInput.toLowerCase()));
    this.searchInput = "";
  }

}
