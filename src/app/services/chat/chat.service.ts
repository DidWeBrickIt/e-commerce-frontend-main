import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message} from "../../models/message/message";
import {Profile} from "../../models/profile/profile";
import {environment} from "../../../environments/environment";
import {User} from "../../models/user/user";
import {Address} from "../../models/address/address";
import {Payment} from "../../models/payment/payment";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messageUrl = '';

  profile: Profile={
    user: new User('', '', '', ''),
    address: new Address('','','','','',''),
    payment: new Payment('','','')}

  constructor(private http: HttpClient) {

    this.http.get<Profile>(
        environment.baseUrl+"/profile",
        {headers: environment.headers,
          withCredentials: environment.withCredentials})
        .subscribe(
            (data) => this.profile = data,
            (err) => console.log(err),
            () => console.log("retrieved profile")
        );
  }

  getMessages(): Observable<Message[]>{
    const username = this.profile.user.email;
    return this.http.get<Message[]>(this.messageUrl + `${username}`);
  }

  postMessage(reply: string): void{

    const username = this.profile.user.email;
    const payload = new Message(username, reply);

    this.http.post(this.messageUrl + `${username}`, payload);

  }
}
