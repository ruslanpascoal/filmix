import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Filme } from 'src/app/models/filme';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
const vibrant = require('node-vibrant');


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('rotate', [
      transition(':enter', [style({ transform: 'rotate(-360deg)' }), animate('2000ms')])
    ])
  ]
})
export class MainComponent implements OnInit {

  constructor(private movieService: MovieService, private route: ActivatedRoute,
    private router: Router, ) { }

  subsc: Subscription
  movie_ids: Array<string> = []
  filme: Filme = { netflix_id: '', imdb_id: '', title: '', year: 0, poster: '', plot: '', genre: [{ id: 0, name: '' }], director: '', actors: '', imdbRating: '' }
  bgGradientLight: string = "";
  bgGradientDark: string = "";
  bgGradientDarkActivated: boolean = false;
  nextClicked: boolean = false;
  isLoaded: boolean = false;
  myListButtonText = {icon: 'add', text: 'MY LIST'}

  ngOnInit() {
    this.nextClicked = !this.nextClicked;
    this.movieService.getFilmeGeneroRating(this.movieService.selctedMinRating, this.movieService.selectedGenre).subscribe(data => {
      data.results.forEach(element => {
        this.movie_ids.push(element.id);
      });
      this.getNext(); 


    })
  }


  getFilmePorNotaMaiorQue(nota) {
    this.movieService.getFilmePorNotaMaiorQue(nota).subscribe(data => {
      this.getFilmeInfo(data.id)
    })
  }

  getFilmeInfo(movie_id) {
    this.movieService.getFilmeTMDB(movie_id).subscribe(data => {
      
      vibrant.from(`https://image.tmdb.org/t/p/original${data.poster_path}`).getPalette()
      .then((palette) => {
        console.log(palette);
        
        this.filme.vibrantColor = palette.Vibrant.hex;
        this.filme.darkColor = palette.DarkVibrant.hex;
        this.bgGradientLight = `linear-gradient(to left bottom, #ffffff, #fff, ${palette.Vibrant.hex})`;
        this.bgGradientDark = `linear-gradient(to left bottom, ${palette.DarkMuted.hex}, ${palette.Vibrant.hex})`;
      })

      this.filme = {
        title: data.title,
        plot: data.overview,
        imdb_id: data.imdb_id,
        poster: `https://image.tmdb.org/t/p/original${data.poster_path}`,
        genre: data.genres,
        year: data.release_date,
        netflixSearch: data.title,
      }

      this.movieService.getFilmeOMDB(data.imdb_id).subscribe(dataOMDB => {
        this.filme.actors = dataOMDB.Actors,
          this.filme.director = dataOMDB.Director,
          this.filme.imdbRating = dataOMDB.imdbRating,
          this.filme.awards = dataOMDB.Awards

      });
    });
  }

  getNext() {
    this.getFilmeInfo(this.movie_ids[Math.floor((Math.random() * this.movie_ids.length) + 0)]);
    this.nextClicked = !this.nextClicked;
    this.isLoaded = true;
  }

  addMyList(){
    if (this.myListButtonText.icon == 'add') {
      this.myListButtonText.icon = 'done'

    } else {
      this.myListButtonText.icon = 'add'

    }

    

  }


}
