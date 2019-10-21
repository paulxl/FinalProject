import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { LoginComponent } from '../components/login/login.component';

const routes: Routes = [

      {path: 'navBarCommponent',
      component: NavBarComponent},
      {path: 'login', component: LoginComponent},
      {path: '', component: LoginComponent},
      {path: 'logout', component: LoginComponent}

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
   exports: [RouterModule]
})
export class AppRoutingModule { }
