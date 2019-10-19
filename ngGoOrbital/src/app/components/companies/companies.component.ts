import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  TestVehicle = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];


  constructor() { }

  ngOnInit() {
    // this.loadCompany();
  }

  deleteVehicle(id: number) { }

  addNewVehicle(vehicle: any) { }

}
