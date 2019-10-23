<<<<<<< HEAD
import { Component, OnInit } from "@angular/core";
import { Companies } from "src/app/models/companies";
import { Trip } from "src/app/models/trip";
import { CompaniesService } from "src/app/services/companies.service";
import { TripService } from "src/app/services/trip.service";
import { NgForm } from "@angular/forms";
=======
import { Vehicle } from './../../models/vehicle';
import { Component, OnInit } from '@angular/core';
>>>>>>> 5f18948636716bf4bcb2a2eb4304deeb553b490f

@Component({
  selector: "app-companies",
  templateUrl: "./companies.component.html",
  styleUrls: ["./companies.component.css"]
})
export class CompaniesComponent implements OnInit {
  // FIELDS----------
  selected: Companies = null;
  editCompanies: Companies = null;
  companies: Companies;
  editTrip: Trip = null;
  tripselector = null;

  // CONTRRUCTOR-------
  constructor(
    private compServ: CompaniesService,
    private tripServ: TripService
  ) {}

  // METHODS ----------

  ngOnInit() {
    // this.loadCompany();
  }

  compInfo() {
    this.editCompanies = Object.assign({}, this.selected);
  }

  addTrip() {}
  // setEditTrip(trip: Trip) {
  //   this.companies = Object.assign({}, this.selected);
  // }

  updateTrip(form: NgForm) {
    const updateTrip = form.value;
    this.tripServ.updateTrip(updateTrip).subscribe(
      data => {
        this.ngOnInit();
      },
      err => {
        console.error("error in update trip");
      }
    );
  }
  deleteTrip(id: number) {
    this.tripServ.deleteTrip(id).subscribe(
      data => {
        this.ngOnInit();
      },
      err => {
        console.error("error in deleting trip");
      }
    );
  }
  updateCompany(form: NgForm) {
    const updateCompany = form.value;
    this.compServ.updateCompanies(updateCompany).subscribe(
      data => {
        this.ngOnInit();
      },
      err => {
        console.error("error in updating company");
      }
    );
  }

  // deleteVehicle(id: number) { }

  addNewVehicle(vehicle: any) {}

  updateVehicle(id: number) {}
}
