import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.css"]
})
export class LogoutComponent implements OnInit {
  constructor(
    private authenticationService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  logout() {
    this.authenticationService.logout();
    if (localStorage.length === 0) {
      console.log("inside logout if");
      // this.router.navigateByUrl('/logout');
    }
  }
}
