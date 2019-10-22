import { AuthService } from "src/app/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent implements OnInit {
  // Fields
  loginDo = false;
  isLoggedIn = false;
  // Constructor
  constructor(private auth: AuthService) {}

  // Methods
  ngOnInit() {
    this.isLoggedIn = this.auth.isUserLoggedIn();
    console.log("nav ->" + this.isLoggedIn);
  }

  toggleNavbar() {
    this.loginDo = this.loginDo;
  }
}
