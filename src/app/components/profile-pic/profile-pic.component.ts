import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.css']
})
export class ProfilePicComponent implements OnInit {
  @Input() item = ""; // decorate the property with @Input()
  profilePic: string = "";
  isDisplayActive: boolean = true;
  isFormActive: boolean = false;
  panelOpenState = false;

  @Output() newPicEvent = new EventEmitter<string>();

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {

  }

  setProfilePic(choice: string) : void {
    console.log(choice);
    this.profilePic = "../../../assets/images/profile_pic/" + choice;
    this.newPicEvent.emit(this.profilePic);
  }

  togglePicDisplay(): void {
    this.isDisplayActive = !this.isDisplayActive;
    this.isFormActive = !this.isFormActive;
  }
  

}
