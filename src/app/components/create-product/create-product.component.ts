import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  user: string | null = localStorage.getItem("jwt");
  userAccess = "";
  showForm: boolean = true;
  word: string = "";

  @Input() productName: string = "";

  @Input() updatingProduct: boolean = false;

  @Input() toggleAcc: boolean = false;

  @Input() productInfo: Product = {
    id: 0,
    quantity: 0,
    price: 0,
    description: "",
    image: "",
    name: ""
  };
  product: Product = {
    id: 0,
    quantity: 0,
    price: 0,
    description: "",
    image: "",
    name: ""
  };

  hasError: boolean = false;
  errorMessage: string = "";

  @Output() boolEvent = new EventEmitter<boolean>();

  constructor(private productService: ProductService, private router : Router) { }

  sendBoolean(toSend: boolean) {
    this.boolEvent.emit(toSend);
  }

  openAcc() {
    this.toggleAcc = true;
    this.sendBoolean(this.toggleAcc);
  }
  closeAcc() {
    this.toggleAcc = false;
    this.sendBoolean(this.toggleAcc);
  }

  ngOnInit(): void {
    if (this.user !== null) {
      this.userAccess = JSON.parse(this.user).userAccess;
    }
    this.cancel();
  }

  cancel() {
    this.closeAcc();
    this.productInfo = {
      id: 0,
      quantity: 0,
      price: 0,
      description: "",
      image: "",
      name: ""
    };
    this.productName = "";
  }

  createProduct() {
    this.product = this.productInfo;
    this.showForm = false;
    if (this.productName !== "") {
      this.word = "updated";
    }
    else {
      this.word = "created";
    }
    this.productService.createProduct(this.product).subscribe(
      res => console.log('HTTP response', res),
      (err) => {
        console.log(err)
        this.hasError = true;
        if (err.status === 400 || err.status === 403 || err.status === 404) {
          this.errorMessage = "There was an error processing your request. Please make sure all fields are of their valid type.";
        }
        if (err.status !== 400 && err.status !== 403 && err.status !== 404) {
          this.errorMessage = "Server error, please try again later";
        }
        console.log('HTTP Error', err)
      },
      () => console.log('HTTP request completed.')
    );
    this.productInfo = {
      id: 0,
      quantity: 0,
      price: 0,
      description: "",
      image: "",
      name: ""
    };
  }

  closeDiv() {
    this.showForm = true;
    this.productName = "";
    this.closeAcc();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate(['home']));
  }

}
