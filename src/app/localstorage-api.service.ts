import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageApiService {
  constructor() { }

  toggleFavorite(key) {
    let value = localStorage.getItem(key);
    if (value == null) {
      localStorage.setItem(key, 'true')
    } else {
      localStorage.removeItem(key);
    }
  }

  isInFavorite(key) {
    return (localStorage.getItem(key) === 'true')
  }

  getAllFavoriteFilms() {
    return Object.keys(localStorage);
  }
}
