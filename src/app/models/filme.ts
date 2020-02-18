export interface Filme {

    netflix_id?: string,
    imdb_id?: string
    title?: string,
    year?: number,
    poster?: string,
    plot?: string,
    genre?: [{id: number, name: string}],
    director?: string,
    actors?: string,
    imdbRating?: string,
    awards?: string
    netflixSearch?: string,
    vibrantColor?: string,
    darkColor?: string,
    hover?: boolean,
   
}
