import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address';

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
}
