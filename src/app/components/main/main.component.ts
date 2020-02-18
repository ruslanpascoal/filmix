import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Filme } from 'src/app/models/filme';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MyListService } from 'src/app/services/my-list.service';
import { NavigationService } from 'src/app/services/navigation.service';
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

  constructor(private movieService: MovieService, private route: ActivatedRoute, private myListService: MyListService,
    private router: Router, private navigationService: NavigationService) { }

  subsc: Subscription
  movie_ids: Array<string> = []
  filme: Filme = { netflix_id: '', imdb_id: '', title: '', year: 0, poster: '', plot: '', genre: [{ id: 0, name: '' }], director: '', actors: '', imdbRating: '' }
  bgGradientLight: string = "";
  bgGradientDark: string = "";
  bgGradientDarkActivated: boolean = false;
  nextClicked: boolean = false;
  isLoaded: boolean = false;
  myListButtonText = { icon: 'add', text: 'MY LIST' }

  ngOnInit() {
    this.nextClicked = !this.nextClicked;




    if (this.navigationService.cameFromMyList) this.resetInfo()
    else this.getNext()

    if (this.myListService.getList().includes(this.filme)) {
      console.log(this.myListService.getList().includes(this.filme));

      this.myListButtonText.icon = 'done'
    }

  }


  getFilmePorNotaMaiorQue(nota) {
    this.movieService.getFilmePorNotaMaiorQue(nota).subscribe(data => {
      this.getFilmeInfo(data.id)
    })
  }

  getFilmeInfo(movie_id) {
    console.log(movie_id);

    this.movieService.getFilmeTMDB(movie_id).subscribe(data => {

      vibrant.from(`https://image.tmdb.org/t/p/original${data.poster_path}`).getPalette()
        .then((palette) => {
          console.log(palette);

          this.filme.vibrantColor = palette.Vibrant.hex;
          this.filme.darkColor = palette.DarkVibrant.hex;
          this.bgGradientLight = `linear-gradient(to left bottom, #ffffff, #ffffff,  #ffffff, ${palette.Vibrant.hex}, ${palette.Vibrant.hex})`;
          this.bgGradientDark = `linear-gradient(to left bottom,  ${palette.DarkMuted.hex}, ${palette.Vibrant.hex}, ${palette.Vibrant.hex})`;
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
    this.myListButtonText.icon = 'add';
    let total_pages: number = 1;

    if (this.movieService.selectedGenre.id == 1) {

      this.movieService.getFilmePorNotaMaiorQue(this.movieService.selctedMinRating).subscribe(data => {

        data.results.forEach(element => {
          this.movie_ids.push(element.id);
        });



        this.getFilmeInfo(this.movie_ids[Math.floor((Math.random() * this.movie_ids.length) + 0)]);
        this.nextClicked = !this.nextClicked;
        this.isLoaded = true;

      })
    }

    else {

      this.movieService.getNumberOfPages(this.movieService.selctedMinRating, this.movieService.selectedGenre).subscribe(
        data => {

          total_pages = data.total_pages;
          console.log(total_pages);

          this.movieService.getFilmeGeneroRating(this.movieService.selctedMinRating, this.movieService.selectedGenre, total_pages).subscribe(data => {
            data.results.forEach(element => {
              this.movie_ids.push(element.id);

            });
            this.getFilmeInfo(this.movie_ids[Math.floor((Math.random() * this.movie_ids.length) + 0)]);
            console.log(this.movie_ids);
          }
          );


          this.nextClicked = !this.nextClicked;
          this.isLoaded = true;

        })
    }

  }

  addMyList() {

    if (this.myListService.getList().includes(this.filme)) {
      this.myListButtonText.icon = 'add'
      this.myListService.remove(this.filme)
      
    } else {
      this.myListButtonText.icon = 'done'
      this.myListService.add(this.filme)
    }
  }

  openMyList() {
    this.movieService.currentMovieDiscover = this.filme;
    this.router.navigate(['mylist']);

  }

  resetInfo() {
    this.filme = this.movieService.currentMovieDiscover;
    console.log("CAME FROM MY LIST, FILME: " + this.filme);

    vibrant.from(this.filme.poster).getPalette()
      .then((palette) => {
        console.log(palette);

        this.filme.vibrantColor = palette.Vibrant.hex;
        this.filme.darkColor = palette.DarkVibrant.hex;
        this.bgGradientLight = `linear-gradient(to left bottom, #ffffff, #ffffff,  #ffffff, ${palette.Vibrant.hex}, ${palette.Vibrant.hex})`;
        this.bgGradientDark = `linear-gradient(to left bottom, ${palette.DarkMuted.hex}, ${palette.Vibrant.hex})`;
      })

    this.isLoaded = true;
  }

}
