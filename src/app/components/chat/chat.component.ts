import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../services/chat/chat.service";
import {Message} from "../../models/message/message";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages: Message[] = []
  reply: string = '';
  interval: any;
  showChat: boolean = false;

  constructor(private chat: ChatService,) { }

  ngOnInit(): void {
    this.refreshData();
    this.interval = setInterval(() => {
      this.refreshData();
    }, 2500);
  }

  toggleChat(): void{
    this.showChat = !this.showChat;
  }
  refreshData(): void{
    this.chat.getMessages().subscribe(data => this.messages = data);
  }

  send(): void{
    this.chat.postMessage(this.reply)
  }
}
