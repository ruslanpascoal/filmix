import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { MylistComponent } from './components/mylist/mylist.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'discover', component: MainComponent, canActivate: [AuthGuard] },
  {path: 'mylist', component: MylistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
