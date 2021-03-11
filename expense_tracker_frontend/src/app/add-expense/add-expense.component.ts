import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { utilHelpers } from '../services/utilHelpers';
import { ActivatedRoute } from '@angular/router';
import { alertService } from '../services/alertService';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { expensesService } from '../services/expenses';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
})
export class AddExpenseComponent implements OnInit {
  data: any;
  userId = '';
  myForm: FormGroup;
  selectedValue: string;
  maxDate = new Date();
  selectedFiles = '';
  error: String = '';
  isfileUpload: Boolean = false;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private expensesServiceHelper: expensesService,
    private _snackBar: alertService,
    private ngxService: NgxUiLoaderService,
    private route: ActivatedRoute
  ) {
    this.http
      .get<any>(`${environment.BASE_URL}category/all`, {
        headers: utilHelpers.headers(),
      })
      .subscribe((data) => {
        this.data = data;
      });
  }
  fileUpload() {
    this.isfileUpload = !this.isfileUpload;
  }
  selectFile(event) {
    let base64 = '';
    this.selectedFiles = event.target.files;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      base64 = reader.result.toString().substring(28);
      this.expensesServiceHelper
        .addExpenseReport(base64)
        .pipe(first())
        .subscribe(
          (data) => {
            this.myForm = this.fb.group({
              amount: new FormControl(data.amount, [
                Validators.required,
                Validators.required,
              ]),
              category: new FormControl(data.category, [
                Validators.required,
                Validators.required,
              ]),
              shopName: new FormControl(data.shopName, [
                Validators.required,
                Validators.required,
              ]),
              date: new FormControl(data.date, [
                Validators.required,
                Validators.required,
              ]),
            });
          },
          (error) => {
            console.log(error);
          }
        );
    };
  }
  get amountInput() {
    return this.myForm.get('amount');
  }
  get categoryInput() {
    return this.myForm.get('category');
  }
  get dateInput() {
    return this.myForm.get('date');
  }
  get shopNameInput() {
    return this.myForm.get('shopName');
  }
  ngOnInit(): void {
    this.myForm = this.fb.group({
      amount: new FormControl('', [Validators.required, Validators.required]),
      category: new FormControl('', [Validators.required, Validators.required]),
      shopName: new FormControl('', [Validators.required, Validators.required]),
      date: new FormControl('', [Validators.required, Validators.required]),
    });
    this.route.params.subscribe((params) => (this.userId = params['userid']));
  }
  addExpense() {
    if (
      !this.categoryInput.value ||
      !this.amountInput.value ||
      !this.dateInput.value ||
      !this.shopNameInput.value
    ) {
      this._snackBar.snackbar('Please fill all the Required Fields');
      return;
    }
    this.ngxService.start();
    this.expensesServiceHelper
      .addExpense(
        this.categoryInput.value,
        this.amountInput.value,
        this.dateInput.value,
        this.shopNameInput.value,
        this.userId
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.ngxService.stop();
          this._snackBar.snackbar(
            `Expense Added Successfully for ${utilHelpers.toTitleCase(
              data?.user?.fname
            )} ${utilHelpers.toTitleCase(data?.user?.lname)} !!`
          );
          this.myForm = this.fb.group({
            amount: new FormControl(''),
            category: new FormControl(''),
            shopName: new FormControl(''),
            date: new FormControl(''),
          });
        },
        (error) => {
          this.ngxService.stop();
          this.error = error?.message;
          this._snackBar.snackbar(error?.message);
        }
      );
  }
}
