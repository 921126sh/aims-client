import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../model/user';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/user-add.dialog.html',
  styleUrls: ['../../dialogs/add/user-add.dialog.css'],
  providers: [UserService]
})

export class UserAddDialogComponent {
  constructor(public dialogRef: MatDialogRef<UserAddDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public user: User,
     public userService: UserService
    ) { }

  formControl = new FormControl('', [
    Validators.required
  ]);

  cars: any[] = [
    {value: 'volvo', viewValue: 'Volvo'},
    {value: 'saab', viewValue: 'Saab'},
    {value: 'mercedes', viewValue: 'Mercedes'}
  ];

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * 사용자 등록을 요청한다.
   */
  public confirmAdd(): void {
    this.userService.addUser(this.user);
  }
}
