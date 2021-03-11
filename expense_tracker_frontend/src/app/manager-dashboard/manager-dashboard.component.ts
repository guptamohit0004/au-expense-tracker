// import { ManagerService } from './../services/manager';
import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../services/manager';

@Component({
  selector: 'manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css'],
})
export class ManagerDashboardComponent implements OnInit {
  public employees;
  constructor(private api: ManagerService) {}
  ngOnInit() {
    this.api.getEmployee().subscribe((res) => {
      this.employees = res;
    });
  }
}
