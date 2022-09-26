import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../services/chat/chat.service";
import {Message} from "../../models/message/message";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  messages: Message[] = []
  reply: string = '';
  interval: any;
  showChat: boolean = false;

  constructor(private chat: ChatService,) { }

  toggleChat(): void{
    if (!this.showChat){
      this.refreshData();
      this.interval = setInterval(() => {
        this.refreshData();
      }, 2500);
    } else{
      clearInterval(this.interval);
      this.interval = null;
    }

    this.showChat = !this.showChat;
  }
  refreshData(): void{
    this.chat.getMessages().subscribe(data => this.messages = data);
  }

  send(): void{
    this.chat.postMessage(this.reply)
  }
}
