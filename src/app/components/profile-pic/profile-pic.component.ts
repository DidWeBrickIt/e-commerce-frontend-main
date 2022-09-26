import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.css']
})
export class ProfilePicComponent implements OnInit {

  @Input() item = ""; // decorate the property with @Input()
  profilePic: string = "";

  @Output() newPicEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {

  }

  setProfilePic(choice: string) : void {
    console.log(choice);
    this.profilePic = "../../../assets/images/profile_pic/" + choice;
    this.item = this.profilePic;
    this.newPicEvent.emit(this.profilePic);
  }


}
