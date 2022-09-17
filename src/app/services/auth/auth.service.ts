import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Jwt } from '../../models/jwt/jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl: string = `${environment.baseUrl}/auth`;
  loggedIn: boolean = false;
  userAccess: string = '';

  constructor(private http: HttpClient) {
    this.getJwtFromStorage();
  }

  login(email: string, password: string): Observable<any> {
    const payload = { email: email, password: password };
    return this.http.post<Jwt>(`${this.authUrl}/login`, payload, { headers: environment.headers, withCredentials: environment.withCredentials });
  }

  getJwtFromStorage() {
    let storedJwt: string | null = localStorage.getItem("jwt");

    if (storedJwt === null) {
      environment.headers.auth = '';
      this.userAccess = '';
      return;
    }
    let jwt: Jwt = JSON.parse(storedJwt);
    environment.headers.auth = jwt.jwt;
    this.userAccess = jwt.userAccess;
  }

  setJWT(jwt: Jwt): void {
    environment.headers.auth = jwt.jwt;
    this.userAccess = jwt.userAccess;
    localStorage.setItem("jwt", JSON.stringify(jwt));
  }

  logout(): void {
    environment.headers.auth = ' ';
    localStorage.removeItem('jwt');
  }

  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    const payload = { firstName: firstName, lastName: lastName, email: email, password: password };
    return this.http.post<any>(`${this.authUrl}/register`, payload, { headers: environment.headers });
  }
}