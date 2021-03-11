import { BrowserModule } from '@angular/platform-browser';
import { EmployeeService } from './employee-dashboard/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { LoginComponent } from './login/login.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProtectedRoute } from './protected-router.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReportComponent } from './report/report.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatDialogModule } from '@angular/material/dialog';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDashboardComponent,
    ManagerDashboardComponent,
    EmployeeTableComponent,
    AddExpenseComponent,
    NavBarComponent,
    LoginComponent,
    NotFoundComponent,
    ReportComponent,
    RegisterEmployeeComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    MatButtonModule,
    HttpClientModule,
    MatInputModule,
    MatChipsModule,
    FormsModule,
    MatCheckboxModule,
    MatTableModule,
    MatSelectModule,
    NgxUiLoaderModule,
    MatListModule,
    MatRippleModule,
    MatIconModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatTableExporterModule,
    AppRoutingModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatCardModule,
    MatDialogModule,
    MatListModule,
    MatRippleModule,
  ],
  providers: [ProtectedRoute, EmployeeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
