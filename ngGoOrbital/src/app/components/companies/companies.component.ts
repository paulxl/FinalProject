import { Component, OnInit } from '@angular/core';
import { Companies } from 'src/app/models/companies';
import { Trip } from 'src/app/models/trip';
import { CompaniesService } from 'src/app/services/companies.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  // FIELDS----------
  selected: Companies = null;
  editCompanies: Companies = null;
  companies: Companies;
  editTrips: Trip = null;
  


  // CONTRRUCTOR-------
  constructor(private compServ : CompaniesService, private tripServ : TripService) { }

  // METHODS ----------

  ngOnInit() {
    // this.loadCompany();
  }

  compInfo() {
    
  }
  setTrips() {
    
  }
  addTrip() {
    
  }




  deleteVehicle(id: number) { }

  addNewVehicle(vehicle: any) { }

  updateVehicle(id: number) { }

  addNewCompany(vehicle: any) { }
}
