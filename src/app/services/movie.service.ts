import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Filme } from './../models/filme';
import { Genero } from '../models/genero';

@Injectable({
  providedIn: 'root'
})

export class MovieService {



  selectedGenre: Genero = { id: 1, genreName: '', pageNum: 150 };
  selctedMinRating: number;
  currentMovieDiscover: Filme;

  constructor(private http: HttpClient) { }

  getFilmeTMDB(movie_id) {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=4336068e6ed574149f7c4fb2653f6276&language=en-US`)

  }

  getFilmeOMDB(imdb_id) {
    return this.http.get<any>(`https://www.omdbapi.com/?i=${imdb_id}&apikey=bb5ac6ed`)
  }

  getFilmePorNotaMaiorQue(notaMinima) {

    let page = Math.floor((Math.random() * 150) + 1);
    return this.http.get<any>(`https://api.themoviedb.org/3/discover/movie?api_key=4336068e6ed574149f7c4fb2653f6276&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&vote_average.gte=${notaMinima}&vote_count.gte=100`);
  }

  getFilmeGeneroRating(notaMinima, genero: Genero, total_pages) {

    let page = Math.floor((Math.random() * total_pages) + 1);

    return this.http.get<any>(`https://api.themoviedb.org/3/discover/movie?api_key=4336068e6ed574149f7c4fb2653f6276&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&vote_average.gte=${notaMinima}&vote_count.gte=100&with_genres=${genero.id}`);
  }

  getNumberOfPages(notaMinima, genero: Genero) {
    return this.http.get<any>(`https://api.themoviedb.org/3/discover/movie?api_key=4336068e6ed574149f7c4fb2653f6276&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_average.gte=${notaMinima}&vote_count.gte=100&with_genres=${genero.id}`);
  }

  setUserChoices(nota, genero) {
    this.selectedGenre = genero;
    this.selctedMinRating = nota;
  }

}
