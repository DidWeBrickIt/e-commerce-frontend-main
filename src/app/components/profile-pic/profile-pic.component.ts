import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.css']
})
export class ProfilePicComponent implements OnInit {
  @Input() item = ''; // decorate the property with @Input()
  profilePic: string = "";
  isDisplayActive: boolean = true;
  isFormActive: boolean = false;
  panelOpenState = false;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profilePic = this.item;
    console.log(this.profilePic);
  }

  

  setProfilePic(choice: string) : void {
    console.log(choice);

  }

  getProfilePic() : string
  {
    //get profilepic from db
    console.log("If you see me, getting the profile pic has not been implimented");
    return "../../../assets/images/profile_pic/";
  }

  togglePicDisplay(): void {
    this.isDisplayActive = !this.isDisplayActive;
    this.isFormActive = !this.isFormActive;
  }
  

}
