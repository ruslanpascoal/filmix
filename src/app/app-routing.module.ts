import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { MylistComponent } from './components/mylist/mylist.component';
import { HomeMobileComponent } from './components/mobile/home-mobile/home-mobile.component';
import { MainMobileComponent } from './components/mobile/main-mobile/main-mobile.component';
import { MyListMobileComponent } from './components/mobile/my-list-mobile/my-list-mobile.component';
import { ApplicationService } from './services/application.service';
import { GeneroComponent } from './components/mobile/home/genero/genero.component';
import { RatingComponent } from './components/mobile/home/rating/rating.component';


const desktop_routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'discover', component: MainComponent, canActivate: [AuthGuard], data: { animation: 'DiscoverPage' } },
  { path: 'mylist', component: MylistComponent, canActivate: [AuthGuard], data: { animation: 'MyListPage' } },
  { path: '**', redirectTo: '' }
];

const mobile_routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeMobileComponent },
  { path: 'genero', component: GeneroComponent },
  { path: 'discover', component: MainMobileComponent, canActivate: [AuthGuard] },
  { path: 'mylist', component: MyListMobileComponent, canActivate: [AuthGuard] },
  { path: 'rating', component: RatingComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }


]

@NgModule({
  imports: [RouterModule.forRoot(desktop_routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  public constructor(private router: Router,
    private applicationService: ApplicationService) {

    if (applicationService.getIsMobileResolution()) {
      router.resetConfig(mobile_routes);
    }
  }

}
