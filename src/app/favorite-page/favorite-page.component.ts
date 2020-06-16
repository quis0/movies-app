import { Component, OnInit } from '@angular/core';

import { LocalstorageApiService } from '../localstorage-api.service';
import { DatabaseAPIService } from '../database-api.service';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.sass']
})
export class FavoritePageComponent implements OnInit {
  keys: string[];
  films = [];


  constructor(private localstorageApi: LocalstorageApiService, private databaseApi: DatabaseAPIService) { }

  toggleFavorite(id) {
    const target = event.target as HTMLTextAreaElement;
    const card = target.closest('.favorite-page__card');
    const parent = card.parentNode;
    parent.removeChild(card);
    this.localstorageApi.toggleFavorite(id);
  }

  ngOnInit(): void {
    this.keys = this.localstorageApi.getAllFavoriteFilms()

    for (let key of this.keys) {
      this.databaseApi.getFilmInfo(key).subscribe(response => {
        const obj = {
          url: response.poster_path,
          title: response.title,
          tagline: response.tagline,
          budget: response.budget,
          revenue: response.revenue,
          overview: response.overview,
          genres: [],
          id: key,
        }
        response.genres.forEach(genre => obj.genres.push(genre.name));
        this.films.push(obj)
      }, err => console.log(err));
    }

  }

}
