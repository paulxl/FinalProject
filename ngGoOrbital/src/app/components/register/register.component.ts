import { UserService } from 'src/app/services/user.service';
import { TravelerService } from './../../services/traveler.service';
import { AuthService } from './../../services/auth.service';
import { CompanyDTO } from './../../models/company-dto';
import { Component, OnInit } from '@angular/core';
import { Traveler } from 'src/app/models/traveler';
import { Companies } from 'src/app/models/companies';
import { CompaniesService } from 'src/app/services/companies.service';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
import { TravelerDTO } from 'src/app/models/traveler-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
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
    private travServ: TravelerService,
    private userServ: UserService
  ) {}

  // Methods

  ngOnInit() {
    this.newTraveler = null;
    this.newCompany = null;
  }

  // addUser(user: User) {
  //   this.auth.(user).subscribe(
  //     data => {
  //       console.log('RegisterComponent.register(): user registered.');
  //       this.(user.username, user.password).subscribe(
  //         next => {
  //           console.log(
  //             'RegisterComponent.register(): user logged in, routing to /main.'
  //           );
  //           // this.router.navigateByUrl("/main");
  //         },
  //         error => {
  //           console.error('RegisterComponent.register(): error logging in.');
  //         }
  //       );
  //     },
  //     err => {
  //       console.error('RegisterComponent.register(): error registering.');
  //       console.error(err);
  //     }
  //   );
  // }

  addNewTraveler(form: NgForm) {
    // const dto: TravelerDTO = form.value;
    const user: User = new User();
    user.email = form.value.email;
    user.password = form.value.password;
    user.username = form.value.username;
    this.auth.registerTraveler(form.value).subscribe(
      data => {
        console.log('RegisterComponent.register(): user registered.');
        this.auth.authenticationService(user.username, user.password).subscribe(
          next => {
            console.log(
              'RegisterComponent.register(): user logged in, routing to /main.'
            );
          },
          error => {
            console.log(error);
            console.error('RegisterComponent.register(): error logging in.');
          }
        );
      },
      err => {
        console.error('RegisterComponent.register(): error registering.');
        console.error(err);
      }
    );
    this.newTraveler = null;
  }

  addNewCompany(form: NgForm) {
    const dto: CompanyDTO = form.value;
    const user: User = new User();
    user.email = form.value.email;
    user.password = form.value.password;
    user.username = form.value.username;
    this.auth.registerCompany(dto).subscribe(
      data => {
        console.log('RegisterComponent.register(): user registered.');
        this.auth.authenticationService(user.username, user.password).subscribe(
          next => {
            console.log(
              'RegisterComponent.register(): user logged in, routing to /main.'
            );
            // this.router.navigateByUrl("/main");
          },
          error => {
            console.log(error);
            console.error('RegisterComponent.register(): error logging in.');
          }
        );

        // perstist company to method that calls /api/companies post
      },
      err => {
        console.error('RegisterComponent.register(): error registering.');
        console.error(err);
      }
    );
    this.newCompany = null;
  }

}
