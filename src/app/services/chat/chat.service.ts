import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message} from "../../models/message/message";
import {Profile} from "../../models/profile/profile";
import {environment} from "../../../environments/environment";
import {User} from "../../models/user/user";
import {Address} from "../../models/address/address";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messageUrl = 'https://dwbi-e-commerce-tech-chat-2.icyflower-b4d66cd7.westus.azurecontainerapps.io/';

  profile: Profile={
    user: new User('', '', '', ''),
    address: new Address('','','','','',''),
   }

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
    return this.http.get<Message[]>(this.messageUrl + "adriano/retrieve");
  }

  postMessage(reply: string): void{

    const username = this.profile.user.email;
    const payload = new Message(username, reply);
    console.log(payload);
    this.http.post(this.messageUrl + "adriano/post", payload).subscribe();

  }
}
