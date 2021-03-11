import { Component, OnInit } from '@angular/core';
import { authenticationService } from '../services/authentication';
import { first } from 'rxjs/operators';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { alertService } from '../services/alertService';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  centered = false;
  disabled = false;
  unbounded = false;
  radius: number;
  color: string;
  myForm: FormGroup;
  currentUser;
  change: Boolean = false;
  get currentPasswordInput() {
    return this.myForm.get('currentPassword');
  }
  get newPasswordInput() {
    return this.myForm.get('newPassword');
  }
  ngOnInit(): void {
    this.myForm = this.fb.group({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
    });
  }
  constructor(
    private fb: FormBuilder,
    private authenticationServiceHelper: authenticationService,
    private _snackBar: alertService
  ) {
    this.authenticationServiceHelper.currentUser.subscribe((x) => {
      this.currentUser = this.authenticationServiceHelper.getDecodedAccessToken(
        x
      );
      this.authenticationServiceHelper
        .getUserProfile()
        .pipe(first())
        .subscribe(
          (data) => {
            this.currentUser = data;
          },
          (response) => {}
        );
    });
  }
  changePassword() {
    this.change = !this.change;
  }
  updatePassword() {
    if (!this.currentPasswordInput.value) {
      this._snackBar.snackbar('Please Enter Current Password!!');
      return;
    }
    this.authenticationServiceHelper
      .changePassword(
        this.currentPasswordInput.value,
        this.newPasswordInput.value
      )
      .pipe(first())
      .subscribe(
        (data) => {},
        (response) => {
          if (response.status === 200) {
            this._snackBar.snackbar('Passwrod Changed Successfully');
          } else {
            this._snackBar.snackbar(
              'Entered Currenct Password is invalid. Please try again!!'
            );
          }
        }
      );
  }
}
