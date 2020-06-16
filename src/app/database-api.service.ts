import { Injectable } from '@angular/core';

import { ajax } from 'rxjs/ajax';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseAPIService {

  apiKey: string = '3421d0cc7af7fc1a444dd7cd34812e5b';
  url: string = 'https://api.themoviedb.org';
  searchValue: string;

  constructor() { }

  getPopularFilmsData() {

    // Делаем 5 запросов, т.к. у фильмов после 100 рейтинг популярности крайне мал и добавлять эти фильмы в раздел "популярное" не имеет смысла

    const request = (page) => {
      return ajax.getJSON(`${this.url}/3/movie/popular?api_key=${this.apiKey}&language=ru&page=${page}`)

        .pipe(
          map(response => response),

          catchError(error => {
            return of(error);
          })
        )
    }

    const obs$ = forkJoin({
      first: request(1),
      second: request(2),
      third: request(3),
      fourth: request(4),
      fifth: request(5)
    });

    return obs$;
  }

  getGenresList() {
    const obs$ = ajax.getJSON(`${this.url}/3/genre/movie/list?api_key=${this.apiKey}&language=ru`)
      .pipe(map(response => response),

        catchError(error => {
          console.log('error: ', error);
          return of(error);
        })
      )
    return obs$;
  }

  getFilmInfo(id) {
    const obs$ = ajax.getJSON(`${this.url}/3/movie/${id}?api_key=${this.apiKey}&language=ru`)
      .pipe(map(response => response),

        catchError(error => {
          return of(error);
        })
      )
    return obs$;
  }

  getRecommendations(id) {
    const obs$ = ajax.getJSON(`${this.url}/3/movie/${id}/recommendations?api_key=${this.apiKey}&language=ru&page=1`)
      .pipe(
        map(response => response),
        catchError(error => {
          return of(error);
        })
      )
    return obs$;
  }

  getSearchResults() {
    let obs$ = ajax.getJSON(`${this.url}/3/search/movie?api_key=${this.apiKey}&language=ru&query=${this.searchValue}&page=1`)
    .pipe(map(response => response),

        catchError(error => {
          return of(error);
        })
      )
    return obs$;
  }

  setSearchValue(value) {
    this.searchValue = value;
  }

}

