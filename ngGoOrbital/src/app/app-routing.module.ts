import { ShowAllComponent } from './components/show-all/show-all.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { TravelerListComponent } from './components/traveler-list/traveler-list.component';
import { TravelerComponent } from './components/traveler/traveler.component';
import { SearchComponent } from './components/search/search.component';
import { RegisterComponent } from './components/register/register.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LoginComponent } from './components/login/login.component';
import { DetailsComponent } from './components/details/details.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { MainComponent } from './components/main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
{ path: 'main', component: MainComponent },
{ path: 'companies', component: CompaniesComponent },
{ path: 'details', component: DetailsComponent },
{ path: 'login', component: LoginComponent },
{ path: 'logout', component: LogoutComponent },
{ path: 'nav-bar', component: NavBarComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'search', component: SearchComponent },
{ path: 'traveler', component: TravelerComponent },
{ path: 'traveler-list', component: TravelerListComponent },
{ path: 'trip-list', component: TripListComponent },
{ path: 'user-list', component: UserListComponent },
{ path: 'showall', component: ShowAllComponent },


];

@NgModule({
  imports: [NgbModule, RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
