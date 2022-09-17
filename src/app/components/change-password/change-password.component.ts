import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Password} from "../../models/credential/password/password";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<ChangePasswordComponent>,
      @Inject(MAT_DIALOG_DATA) public credential: Password
  ) { }

  ngOnInit(): void {
  }

  onCancel(): void{
    this.dialogRef.close();
  }

}
