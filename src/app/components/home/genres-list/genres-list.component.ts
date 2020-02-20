import { Component, OnInit, ElementRef, HostListener, Output, EventEmitter, Input } from '@angular/core';
import { Genero } from 'src/app/models/genero';
import { AuthService } from 'src/app/services/auth-service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'genres-list',
  templateUrl: './genres-list.component.html',
  styleUrls: ['./genres-list.component.scss']
})
export class GenresListComponent implements OnInit {

  showGenresSection: boolean = false;
  genres: Array<Genero> = [];
  selectedGenre: Genero = { id: 3, genreName: 'Todos os Gêneros' }


  private wasInside = false;

  @HostListener('click')
  clickInside() {
    console.log("clicked inside");

    this.wasInside = true;
  }

  @HostListener('document:click')
  clickout() {
    if (!this.wasInside) {
      console.log("clicked OUTside");
      // this.clickedOutside.emit("clicou_fora")
      if (this.showGenresSection) {
        this.showGenresSection = false;
      }
      else {

      }
    }
    this.wasInside = false;
  }

  constructor(private eRef: ElementRef, private authService: AuthService, private movieService: MovieService) {

  }

  ngOnInit() {

    this.genres.push(
      { id: 1, genreName: 'Todos os Gêneros' },
      { id: 28, genreName: 'Ação' },
      { id: 12, genreName: 'Aventura' },
      { id: 16, genreName: 'Animação' },
      { id: 35, genreName: 'Comédia' },
      { id: 80, genreName: 'Crime' },
      { id: 99, genreName: 'Documentário' },
      { id: 18, genreName: 'Drama' },
      { id: 10751, genreName: 'Família' },
      { id: 14, genreName: 'Fantasia' },
      { id: 878, genreName: 'Ficção Científica' },
      { id: 9648, genreName: 'Suspense' },
      { id: 27, genreName: 'Terror' },
      { id: 53, genreName: 'Thriller' },
      { id: 37, genreName: 'Western' },
    )
  }

  algumacoisa() {
    this.showGenresSection = !this.showGenresSection
  }

  onGenreSelect($event, value, _id, _pageNum) {
    this.selectedGenre.genreName = value;
    this.movieService.selectedGenre = { id: _id, genreName: value, pageNum: _pageNum };
    this.algumacoisa()
  }

}
