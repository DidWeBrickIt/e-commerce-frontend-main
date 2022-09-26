import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Email} from "../../models/credential/email/email";

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent{

  constructor(
      public dialogRef: MatDialogRef<ChangeEmailComponent>,
      @Inject(MAT_DIALOG_DATA) public credential: Email
  ) { }


  onCancel(): void{
    this.dialogRef.close();
  }

}
