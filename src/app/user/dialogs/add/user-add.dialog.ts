import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { userRestrict } from '../../../core/services/app-config.service';
@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/user-add.dialog.html',
  styleUrls: ['../../dialogs/add/user-add.dialog.css']
})

export class UserAddDialogComponent {
  userService: UserService;
  user: User = new User("", "dd", "", "");

  constructor(public dialogRef: MatDialogRef<UserAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userService = data.userService;
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  cars: any[] = [
    { value: 'MANAGER', viewValue: 'Volvo' },
    { value: 'MANAGER', viewValue: 'Saab' },
    { value: 'MANAGER', viewValue: 'Mercedes' }
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
    this.userService.addUser(this.user)
  }
}
