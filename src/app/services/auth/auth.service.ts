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
    environment.headers.auth = jwt.jwtData;
    this.userAccess = jwt.userAccess;
  }

  setJWT(jwt: Jwt): void {
    environment.headers.auth = jwt.jwtData;
    this.userAccess = jwt.userAccess;
    localStorage.setItem("jwt", JSON.stringify(jwt));
  }

  logout(): void {
    environment.headers.auth = ' ';
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
  }

  register(firstName: string, lastName: string, email: string, password: string, securityQuestion: string, answer: string): Observable<any> {
    const user = {firstName: firstName, lastName: lastName, email: email, password: password};
    const question = {securityQuestion, answer}
    const payload = { user, question};
    return this.http.post<any>(`${this.authUrl}/register`, payload, { headers: environment.headers });
  }

  resetPassword(username: string, password: string, answer:string): Observable<any>{

    const payload = {username, password, answer};
    console.log(payload);
    return this.http.patch(`${this.authUrl}/reset`, payload, { headers: environment.headers })
  }
}
