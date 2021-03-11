import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { authenticationService } from '../services/authentication';
import { alertService } from '../services/alertService';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  hide: boolean;
  error: string = '';
  constructor(
    private fb: FormBuilder,
    private authenticationServiceHelper: authenticationService,
    private alertServiceHelper: alertService,
    private router: Router,
    private ngxService: NgxUiLoaderService
  ) {
    if (this.authenticationServiceHelper.currentUserValue) {
      if (
        this.authenticationServiceHelper.getDecodedAccessToken(
          this.authenticationServiceHelper.currentUserValue
        ).roles == 'ROLE_ADMIN'
      ) {
        this.router.navigate(['/all-users']);
      } else if (
        this.authenticationServiceHelper.getDecodedAccessToken(
          this.authenticationServiceHelper.currentUserValue
        ).roles == 'ROLE_USER'
      ) {
        window.location.href = '/employee-dashboard';
      }
    }
  }
  get emailInput() {
    return this.myForm.get('email');
  }
  get passwordInput() {
    return this.myForm.get('password');
  }
  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.hide = true;
    if (this.authenticationServiceHelper.currentUserValue) {
      if (
        this.authenticationServiceHelper.getDecodedAccessToken(
          this.authenticationServiceHelper.currentUserValue
        ).roles == 'ROLE_ADMIN'
      ) {
        this.router.navigate(['/all-users']);
      } else if (
        this.authenticationServiceHelper.getDecodedAccessToken(
          this.authenticationServiceHelper.currentUserValue
        ).roles == 'ROLE_USER'
      ) {
        window.location.href = '/employee-dashboard';
      }
    }
  }
  login() {
    if (this.myForm.invalid) {
      this.alertServiceHelper.snackbar('Please fill all the Required Fields');
      return;
    }
    if (this.emailInput.value && this.passwordInput.value) {
      this.ngxService.start();
      this.authenticationServiceHelper
        .login(this.emailInput.value, this.passwordInput.value)
        .pipe(first())
        .subscribe(
          (data) => {
            this.ngxService.stop();
            this.alertServiceHelper.snackbar('Login Successfully.!!');
            if (
              this.authenticationServiceHelper.getDecodedAccessToken(
                this.authenticationServiceHelper.currentUserValue
              ).roles == 'ROLE_ADMIN'
            ) {
              this.router.navigate(['/all-users']);
            } else if (
              this.authenticationServiceHelper.getDecodedAccessToken(
                this.authenticationServiceHelper.currentUserValue
              ).roles == 'ROLE_USER'
            ) {
              window.location.href = '/employee-dashboard';
            }
          },
          (error) => {
            this.ngxService.stop();
            this.error = error?.error?.message;
            this.alertServiceHelper.snackbar(this.error);
          }
        );
    }
  }
  forgot() {
    if (!this.emailInput.value) {
      this.alertServiceHelper.snackbar('Please enter Email ID');
    } else {
      this.ngxService.start();
      this.authenticationServiceHelper
        .forgotPassword(this.emailInput.value)
        .pipe(first())
        .subscribe(
          (data) => {},
          (response) => {
            this.ngxService.stop();
            if (response.status === 200) {
              this.alertServiceHelper.snackbar(
                'Password sent on Email Successfully!!'
              );
            } else {
              this.alertServiceHelper.snackbar(response.error.message);
            }
          }
        );
    }
  }
}
