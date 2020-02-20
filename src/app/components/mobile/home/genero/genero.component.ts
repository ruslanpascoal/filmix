import { Component, OnInit } from '@angular/core';
import { Genero } from 'src/app/models/genero';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.scss']
})
export class GeneroComponent implements OnInit {
  
    constructor(private movieService: MovieService) { }

  genres: Array<Genero> = [];
  selectedGenre: Genero = { id: 3, genreName: 'Todos os Gêneros' }
  genreClicked: boolean = false;


  ngOnInit() {

    this.genres.push(
      { id: 1, genreName: 'Todos os Gêneros', clicked: false },
      { id: 28, genreName: 'Ação' , clicked: false},
      { id: 12, genreName: 'Aventura' , clicked: false},
      { id: 16, genreName: 'Animação' , clicked: false},
      { id: 35, genreName: 'Comédia' , clicked: false},
      { id: 80, genreName: 'Crime' , clicked: false},
      { id: 99, genreName: 'Documentário', clicked: false },
      { id: 18, genreName: 'Drama' , clicked: false},
      { id: 10751, genreName: 'Família' , clicked: false},
      { id: 14, genreName: 'Fantasia' , clicked: false},
      { id: 878, genreName: 'Ficção Científica' , clicked: false},
      { id: 9648, genreName: 'Suspense' , clicked: false},
      { id: 27, genreName: 'Terror' , clicked: false},
      { id: 53, genreName: 'Thriller' , clicked: false},
      { id: 37, genreName: 'Western' , clicked: false},
    )

  }

  onGenreSelect(item: Genero){
    
    this.genres.forEach(element => {
      element.clicked = false;
    });

    item.clicked = true;
    this.movieService.selectedGenre = { id: item.id, genreName: item.genreName };

    

  }

}
