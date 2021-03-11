import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  public employees;
  constructor() {}
  ngOnInit() {}
}
