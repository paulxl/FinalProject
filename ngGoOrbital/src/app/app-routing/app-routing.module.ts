import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';

const routes: Routes = [
  {
      path: 'navBarCommponent',
      component: NavBarComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AppRoutingModule { }
