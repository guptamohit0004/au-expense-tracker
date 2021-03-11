import { Component, OnInit } from '@angular/core';
import { EmployeeDetails } from './EmployeeDetails';
import { ManagerService } from '../services/manager';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { first } from 'rxjs/operators';
import { alertService } from '../services/alertService';

/**
 * @title Employee Details Table
 */
@Component({
  selector: 'employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css'],
})
@Input('ELEMENT_DATA')
export class EmployeeTableComponent implements OnInit {
  name: string;
  animal: string;
  ELEMENT_DATA!: EmployeeDetails[];
  displayedColumns: string[] = [
    'id',
    'name',
    'amount',
    'email',
    'add',
    'report',
    'deleteuser',
  ];
  allExpenses = new MatTableDataSource<EmployeeDetails>(this.ELEMENT_DATA);
  allUsers = new MatTableDataSource<EmployeeDetails>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private service: ManagerService,
    private _snackBar: alertService
  ) {}
  ngOnInit() {
    this.allExpenses.paginator = this.paginator;
    this.allExpenses.sort = this.sort;
    this.allUsers.paginator = this.paginator;
    this.allUsers.sort = this.sort;
    this.getAllEmployees();
    this.getAllExpenses();
  }
  public getAllEmployees() {
    let response = this.service.getEmployee();
    response.subscribe(
      (employee) => (this.allUsers.data = employee as EmployeeDetails[])
    );
  }
  public getAllExpenses() {
    let response = this.service.getAllExpenses();
    response.subscribe(
      (employee) => (this.allExpenses.data = employee as EmployeeDetails[])
    );
  }
  applyFilter(filterValue: string) {
    this.allExpenses.filter = filterValue.trim().toLowerCase();
    this.allUsers.filter = filterValue.trim().toLowerCase();
  }
  deleteuser(id: string) {
    this.service
      .deleteuser(id)
      .pipe(first())
      .subscribe(
        (data) => {},
        (response) => {
          this.getAllEmployees();
          this.getAllExpenses();
          if (response.status === 200) {
            this._snackBar.snackbar('User Deleted Successfully');
          } else {
            this._snackBar.snackbar('User not Deleted. Please try again!!');
          }
        }
      );
  }
}
