import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Filme } from './../models/filme';

@Injectable({
  providedIn: 'root'
})

export class MovieService {


  
  selectedGenre: number;
  selctedMinRating: number;


  constructor(private http: HttpClient) { }

  getFilmeTMDB(movie_id) {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=4336068e6ed574149f7c4fb2653f6276&language=en-US`)
    
  }

  getFilmeOMDB(imdb_id) {
    return this.http.get<any>(`http://www.omdbapi.com/?i=${imdb_id}&apikey=bb5ac6ed`)
  }

  getFilmePorNotaMaiorQue(notaMinima){
    return this.http.get<any>(`https://api.themoviedb.org/3/discover/movie?api_key=4336068e6ed574149f7c4fb2653f6276&sort_by=popularity.desc&include_adult=false&include_video=false&page=5&vote_average.gte=${notaMinima}`)
  }

  getFilmeGeneroRating(notaMinima, genero){
    return this.http.get<any>(`https://api.themoviedb.org/3/discover/movie?api_key=4336068e6ed574149f7c4fb2653f6276&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_average.gte=${notaMinima}&with_genres=${genero}`);
  }

  setUserChoices(nota, genero){
    this.selectedGenre = genero;
    this.selctedMinRating = nota;
  }
  
}
