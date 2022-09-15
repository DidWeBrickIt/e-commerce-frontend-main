import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }


  info = { firstName: '', lastName: '', email: '', password: '' };
  public getAddressInfo(): Observable<Address> {
    return this.http.get<Address>(environment.baseUrl+"/profile", {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  public updateProfile(address:Address): Observable<Address> {
    const payload = JSON.stringify(address)
    return this.http.put<Address>(environment.baseUrl+"/profile", payload, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  //Payment services

  public getPaymentInfo(): Observable<Payment>{ //What to do about baseURL?
    return this.http.get<Payment>(environment.baseUrl+"/profile?", {headers: environment.headers, withCredentials:environment.withCredentials}); 
  }

  public updatePaymentInfo(payment:Payment): Observable<Payment>{ 
    const payload = JSON.stringify(payment) //What to do about baseURL?
    return this.http.put<Payment>(environment.baseUrl+"/profile?", {headers: environment.headers, withCredentials:environment.withCredentials})
  }
}
