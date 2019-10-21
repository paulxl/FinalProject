import { TravelerService } from "./../../services/traveler.service";
import { AuthService } from "./../../services/auth.service";
import { CompanyDTO } from "./../../models/company-dto";

import { Component, OnInit } from "@angular/core";
import { Traveler } from "src/app/models/traveler";
import { Companies } from "src/app/models/companies";
import { UserService } from "src/app/services/user.service";
import { CompaniesService } from "src/app/services/companies.service";
import { User } from "src/app/models/user";
import { NgForm } from "@angular/forms";
import { TravelerDTO } from "src/app/models/traveler-dto";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  // Fields
  newCompany = null;
  newTraveler = null;

  // Contructor

  constructor(
    private userService: UserService,
    private compServ: CompaniesService,
    private auth: AuthService,
    private router: Router,
    private travServ: TravelerService
  ) {}

  // Methods

  ngOnInit() {
    this.newTraveler = null;
    this.newCompany = null;
  }

  addUser(user: User) {
    this.auth.register(user).subscribe(
      data => {
        console.log("RegisterComponent.register(): user registered.");
        this.auth.login(user.username, user.password).subscribe(
          next => {
            console.log(
              "RegisterComponent.register(): user logged in, routing to /main."
            );
            // this.router.navigateByUrl("/main");
          },
          error => {
            console.error("RegisterComponent.register(): error logging in.");
          }
        );
      },
      err => {
        console.error("RegisterComponent.register(): error registering.");
        console.error(err);
      }
    );
  }

  addNewTraveler(form: NgForm) {
    const user: User = new User();
    user.email = form.value.email;
    user.password = form.value.password;
    user.username = form.value.username;
    this.addUser(user);

    const traveler: Traveler = new Traveler();
    traveler.firstName = form.value.firstName;
    traveler.lastName = form.value.lastName;
    traveler.photoUrl = form.value.photoUrl;
    this.newTraveler = null;
  }

  addNewCompany(form: NgForm) {
    const user: User = new User();
    user.email = form.value.email;
    user.password = form.value.password;
    user.username = form.value.username;
    const company: Companies = new Companies();
    company.name = form.value.name;
    company.logoUrl = form.value.logoUrl;
    company.webUrl = form.value.webUrl;
    console.log("inside of add new company register comp");
    console.log(company);
    this.addUser(user).subscribe(
      data => {
        console.log(data);
      },
      err => console.error(err)
    );

    this.compServ
      .addCompanies(company)
      .subscribe(
        data => console.log("great success"),
        err => console.error(err)
      );
    this.newCompany = null;
  }
}
