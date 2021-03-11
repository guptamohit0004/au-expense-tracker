import { Component, OnInit } from '@angular/core';
import { authenticationService } from '../services/authentication';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isLoggedIn: string = '';
  currentUser: any = {};
  constructor(
    private authenticationServiceHelper: authenticationService,
    private router: Router
  ) {
    if (this.authenticationServiceHelper.currentUserValue) {
      this.authenticationServiceHelper.currentUser.subscribe((x) => {
        this.currentUser = this.authenticationServiceHelper.getDecodedAccessToken(
          x
        );
        this.isLoggedIn = x;
      });
    }
  }
  ngOnInit(): void {
    if (this.authenticationServiceHelper.currentUserValue) {
      this.authenticationServiceHelper.currentUser.subscribe((x) => {
        this.currentUser = this.authenticationServiceHelper.getDecodedAccessToken(
          x
        );
        this.isLoggedIn = x;
      });
    }
  }
  logout() {
    this.authenticationServiceHelper.logout();
    this.router.navigate(['/login']);
  }
}
