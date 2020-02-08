import { Component, OnInit, ElementRef, HostListener, } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  constructor(private movieService: MovieService, private router: Router, private authService: AuthService, ) { }

  ngOnInit() {
    setTimeout(() => {
      this.teste = "RUSLAN"
    }, 3000)
  }

  teste: any;
  sliderValue: number = 5;
  optSelected: boolean = false;
  optionSelected: string = '';
  home_button_clicked: boolean = false;
  showGenresSection: boolean = true;
  clickedOut: boolean = false;

  doSomething(value) {

    this.optionSelected = value;
    this.optSelected = true;
  }

  callDiscover() {
    this.authService.optionSelected = true;
    this.movieService.selctedMinRating = this.sliderValue;
    this.router.navigate(['discover']);
  }

  resetHome() {
    this.optSelected = false;
    this.optionSelected = ''
  }

  genresListClickedOut(signal) {
    if (this.showGenresSection) {
      this.showGenresSection = false;
    }
    else {

    }
  }

}
