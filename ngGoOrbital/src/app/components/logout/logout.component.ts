import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {




  isLoggedIn = false;

  constructor(
    private authenticationService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
    console.log('navbar logged in: ' + this.isLoggedIn);

  }

  logout() {
    this.authenticationService.logout();
    if (localStorage.length === 0) {
      console.log('inside logout if');
      // this.router.navigateByUrl('/logout');
    }
  }
}
