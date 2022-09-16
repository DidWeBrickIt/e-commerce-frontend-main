import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Profile} from "../../models/profile/profile";

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  constructor(private http:HttpClient) { }

  public getProfileInfo(): Observable<Profile> {
    return this.http.get<Profile>(
        environment.baseUrl+"/profile",
        {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  public updateProfile(profile: Profile): Observable<Profile> {
    return this.http.patch<Profile>(
        environment.baseUrl+"/profile",
        profile,
        {headers: environment.headers, withCredentials: environment.withCredentials});
  }
}
