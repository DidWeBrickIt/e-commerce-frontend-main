import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';
import { Jwt } from '../models/jwt';

interface Cart {
  cartCount: number;
  products: {
    product: Product,
    quantity: number
  }[];
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl: string = "/api/product";

  private _cart = new BehaviorSubject<Cart>({
    cartCount: 0,
    products: [],
    totalPrice: 0.00
  });

  private _cart$ = this._cart.asObservable();

  getCart(): Observable<Cart> {
    return this._cart$;
  }

  setCart(latestValue: Cart) {
    return this._cart.next(latestValue);
  }

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl+this.productUrl, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  public getSingleProduct(id: number): Observable<Product> {
    return this.http.get<Product>(environment.baseUrl+id);
  }

  public getUserId() : Observable<any>{
    return this.http.get<any>(environment.baseUrl+`/auth`, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  public makeOrder(orders: Order[]){
    const payload = JSON.stringify(orders);
    return this.http.post<Order[]>(environment.baseUrl+`/api/order`, payload, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  public getOrdersByUserId(id: number){
    return this.http.get<Order[]>(environment.baseUrl+`/api/order/${id}`, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  public purchase(products: {id:number, quantity:number}[]): Observable<any> {
    const payload = JSON.stringify(products);
    return this.http.patch<any>(environment.baseUrl+this.productUrl, payload, {headers: environment.headers, withCredentials: environment.withCredentials})
  }
}
