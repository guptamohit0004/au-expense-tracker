import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { utilHelpers } from '../services/utilHelpers';
import { expensesService } from '../services/expenses';
import { first } from 'rxjs/operators';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { alertService } from '../services/alertService';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  userId = '';
  constructor(
    private expensesServiceHelper: expensesService,
    private _snackBar: alertService,
    private route: ActivatedRoute,
    private ngxService: NgxUiLoaderService
  ) {}
  ngOnInit(): void {
    this.range.valueChanges.subscribe(() => {
      if (this.range.value.from && this.range.value.to) {
        this.dates.from = this.range.value.from;
        this.dates.to = this.range.value.to;
      }
    });
    this.route.params.subscribe((params) => (this.userId = params['userid']));
  }
  dataSource: any;
  displayedColumns: string[] = [
    'category',
    'date',
    'shop',
    'amount',
    'percentage',
    'delete',
  ];
  displayedColumnsCategory: string[] = ['category', 'amount', 'percentage'];
  ciretera = 'date';
  dates: any = {};
  range = new FormGroup({
    from: new FormControl(),
    to: new FormControl(),
  });

  selectedDateExpenditure = [];
  selectedDateExpenditurebyCategory = [];
  allExpenses = [];

  generatePDF(type: string) {
    this.ngxService.start();
    let fileName = `Expense Report from ${this.dates.from} to ${this.dates.to}`;
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then((canvas) => {
      var imgWidth = 200;
      var pageHeight = 400;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = pageHeight - imgHeight;
      var position = 0;
      const contentDataURL = canvas.toDataURL('image/JPEG');
      var pdf = new jspdf('p', 'mm', 'a4', true);
      pdf.addImage(contentDataURL, 'JPEG', 5, 0, 200, 287, undefined, 'FAST');
      if (type == 'email') {
        this.expensesServiceHelper
          .sendExpenseReport(pdf.output('datauristring').substring(51))
          .pipe(first())
          .subscribe(
            (data) => {
              this.ngxService.stop();
              console.log(data);
            },
            (error) => {
              this.ngxService.stop();
              if (error.status === 200) {
                this._snackBar.snackbar('Report Sent Successfully');
              } else {
                this._snackBar.snackbar(
                  'Report not Sent. Please try again later.!!'
                );
              }
            }
          );
      }
      this.ngxService.stop();
      pdf.save(fileName);
    });
  }
  fetch() {
    this.ngxService.start();
    if (!this.dates.from) this.dates.from = new Date();
    if (!this.dates.to) this.dates.to = new Date();
    this.expensesServiceHelper
      .getExpensebyDate(
        moment(this.dates.from).format('YYYY-MM-DD'),
        moment(this.dates.to).format('YYYY-MM-DD'),
        this.userId
      )
      .pipe(first())
      .subscribe(
        (data) => {
          data.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          this.dataSource = data;
          let arr = [];
          data.forEach((single) => {
            let index = arr.findIndex((e) => e.name === single.date);
            if (index >= 0) {
              arr[index].value = arr[index].value + single.amount;
            } else {
              arr.push({
                name: single.date,
                value: single.amount,
              });
            }
          });
          this.selectedDateExpenditure = arr;
          this.expensesServiceHelper
            .getExpensebyDateandCategory(
              moment(this.dates.from).format('YYYY-MM-DD'),
              moment(this.dates.to).format('YYYY-MM-DD'),
              this.userId
            )
            .subscribe((data) => {
              let arr = [];
              data.forEach((single) => {
                arr.push({
                  name: single.CategoryName,
                  value: parseInt(single.netAmount),
                });
              });
              this.selectedDateExpenditurebyCategory = arr;
            });
          this.expensesServiceHelper
            .allExpenses(this.userId)
            .subscribe((data) => {
              this.ngxService.stop();
              data.sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              );
              let arr = [];
              data.forEach((single) => {
                let index = arr.findIndex((e) => e.name === single.date);
                if (index >= 0) {
                  arr[index].value = arr[index].value + single.amount;
                } else {
                  arr.push({
                    name: single.date,
                    value: single.amount,
                  });
                }
              });
              this.allExpenses = arr;
            });
        },
        (error) => {}
      );
  }
  updateDates(e: any) {
    this.dates = utilHelpers.getDatesFunction(e);
  }
  deleteExpense(id: string) {
    this.ngxService.start();
    this.expensesServiceHelper
      .deleteExpense(id)
      .pipe(first())
      .subscribe(
        (data) => {},
        (error) => {
          this.ngxService.stop();
          if (error.status === 200) {
            this.fetch();
            this._snackBar.snackbar('Expense Deleted Successfully');
          } else {
            this._snackBar.snackbar('Expense not Deleted. Please try again!!');
          }
        }
      );
  }
  getTotalCost() {
    let totalCost = 0;
    this.dataSource.forEach((single) => {
      totalCost = totalCost + single.amount;
    });
    return totalCost;
  }
}
