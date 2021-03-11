import { ManagerService } from './../services/manager';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { alertService } from '../services/alertService';
import { first } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css'],
})
export class RegisterEmployeeComponent implements OnInit {
  registerForm: FormGroup;
  error: String = '';
  constructor(
    private fb: FormBuilder,
    private _snackBar: alertService,
    private registerUser: ManagerService,
    private ngxService: NgxUiLoaderService
  ) {}
  get fnameInput() {
    return this.registerForm.get('fname');
  }
  get lnameInput() {
    return this.registerForm.get('lname');
  }
  get emailInput() {
    return this.registerForm.get('email');
  }
  get roleInput() {
    return this.registerForm.get('role');
  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      id: new FormControl('', [Validators.required]),
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.required]),
      role: new FormControl('', [Validators.required, Validators.required]),
    });
  }
  register() {
    if (
      this.fnameInput.value &&
      this.lnameInput.value &&
      this.emailInput.value &&
      this.roleInput.value
    ) {
      this.ngxService.start();
      this.registerUser
        .registerUser(
          this.fnameInput.value,
          this.lnameInput.value,
          this.emailInput.value,
          this.roleInput.value
        )
        .pipe(first())
        .subscribe(
          (data) => {
            this.ngxService.stop();
            this._snackBar.snackbar(
              `User Registered Successfully!, Employee's ID is${data.id}, an email with login credentialis is sent to ${data.email}`
            );
          },
          (error) => {
            this.ngxService.stop();
            this.error = error?.error?.message;
            this._snackBar.snackbar(`${this.error}`);
          }
        );
    } else {
      this._snackBar.snackbar('Please Fill all Fields');
    }
  }
}
