import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { MylistComponent } from './components/mylist/mylist.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent},
  {path: 'discover', component: MainComponent, canActivate: [AuthGuard], data: {animation: 'DiscoverPage'} },
  {path: 'mylist', component: MylistComponent, canActivate: [AuthGuard], data: {animation: 'MyListPage'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
