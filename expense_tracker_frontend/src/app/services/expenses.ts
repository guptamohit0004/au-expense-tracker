import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { utilHelpers } from '../services/utilHelpers';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class expensesService {
  constructor(private http: HttpClient) {}
  addExpense(
    category: string,
    amount: string,
    date: string,
    shopName: string,
    userId: string
  ) {
    let url = `${environment.BASE_URL}/expense/add/${category}`;
    if (typeof userId != 'undefined')
      url = `${environment.BASE_URL}/expense/add/${userId}/${category}`;
    return this.http
      .post<any>(
        `${url}`,
        {
          date: date,
          amount: amount,
          shopName: shopName,
        },
        {
          headers: utilHelpers.headers(),
        }
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  getExpensebyDate(from: string, to: string, userId: string) {
    let url = `${environment.BASE_URL}/expense/findBy/*/${from}/${to}`;
    if (typeof userId != 'undefined')
      url = `${environment.BASE_URL}/expense/findBy/${userId}/*/${from}/${to}`;
    return this.http
      .get<any>(`${url}`, {
        headers: utilHelpers.headers(),
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  getExpensebyDateandCategory(from: string, to: string, userId: string) {
    let url = `${environment.BASE_URL}/expense/myNetPerCategory/${from}/${to}`;
    if (typeof userId != 'undefined')
      url = `${environment.BASE_URL}/expense/netPerCategory/${userId}/${from}/${to}`;
    return this.http
      .get<any>(`${url}`, {
        headers: utilHelpers.headers(),
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  allExpenses(userId: string) {
    let url = `${environment.BASE_URL}/expense/my`;
    if (typeof userId != 'undefined')
      url = `${environment.BASE_URL}/expense/findByUser/${userId}`;
    return this.http
      .get<any>(`${url}`, {
        headers: utilHelpers.headers(),
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  deleteExpense(id: string) {
    return this.http
      .delete<any>(`${environment.BASE_URL}/expense/delete/${id}`, {
        headers: utilHelpers.headers(),
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  sendExpenseReport(base64: any) {
    let token = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new HttpHeaders({
      'Content-Type': 'text/plain',
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .post<any>(
        `${environment.BASE_URL}/report/send`,
        JSON.stringify(base64),
        {
          headers: headers,
        }
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  addExpenseReport(base64: any) {
    let token = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new HttpHeaders({
      'Content-Type': 'text/plain',
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .post<any>(
        `${environment.BASE_URL}/report/readfrompdf`,
        JSON.stringify(base64),
        {
          headers: headers,
        }
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  addBatchExpense(base64: any) {
    let token = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new HttpHeaders({
      'Content-Type': 'text/plain',
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .post<any>(
        `${environment.BASE_URL}/report/batchInsert`,
        JSON.stringify(base64),
        {
          headers: headers,
        }
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
