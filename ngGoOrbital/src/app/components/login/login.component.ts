import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService
  ) {}

  ngOnInit() {}

  handleLogin() {
    console.log('LoginComponent.handleLogin(): ' + this.username + ':' + this.password);

    this.authenticationService
      .authenticationService(this.username, this.password)
      .subscribe(
        result => {
          this.invalidLogin = false;
          this.loginSuccess = true;
          this.successMessage = 'Login Successful.';
          let rte = '/main';
          if (this.authenticationService.isTraveler()) {
            rte = '/traveler';
          } else if (this.authenticationService.isCompany()) {
            rte = '/companies';
          }
          console.log('Routing to ' + rte);

          this.router.navigate([rte]);
        },
        fail => {
          this.invalidLogin = true;
          this.loginSuccess = false;
        }
      );
  }
}
