import { Component, OnInit, OnDestroy, ChangeDetectorRef, OnChanges } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnDestroy, OnInit {
  
    username: string;
  password: string;
  errorMessage = "Invalid Credentials";
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  mobileQuery: MediaQueryList;
  isLoggedIn = false;
  loginDo = false;

  ngOnInit() {
    this.isLoggedIn = this.auth.isUserLoggedIn();
    console.log("navbar logged in: " + this.isLoggedIn);
  }

   constructor(private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher, private auth: AuthService, private router:Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  // fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  // fillerContent = Array.from({length: 50}, () =>
  //     `Lorem ipsum dolor sit amet`);

    private _mobileQueryListener: () => void;
 
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

handleLogin() {
    console.log(this.username + ":" + this.password);

    this.auth.authenticationService(this.username, this.password)
      .subscribe(
        result => {
          this.invalidLogin = false;
          this.loginSuccess = true;
          this.successMessage = "Login Successful.";
          this.router.navigate(["/main"]);
        },
        fail => {
          this.invalidLogin = true;
          this.loginSuccess = false;
        }
      );
  }
  
}
