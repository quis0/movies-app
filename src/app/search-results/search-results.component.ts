import { Component, OnInit } from '@angular/core';

import { DatabaseAPIService } from '../database-api.service';
import { LocalstorageApiService } from '../localstorage-api.service'

import { searchResults } from '../results';
import { genres } from '../genres';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.sass']
})
export class SearchResultsComponent implements OnInit {
  searchResults = searchResults;
  genres = genres;
  inFavorites: boolean;

  isInFavorite(id) {
    this.inFavorites = this.localstorageApi.isInFavorite(id);
    return this.inFavorites;
  }

  toggleFavorite(id) {
    this.inFavorites = !this.inFavorites;
    this.localstorageApi.toggleFavorite(id);
  }

  constructor(private databaseApi: DatabaseAPIService, private localstorageApi: LocalstorageApiService) {

  }

  ngOnInit(): void {
    this.databaseApi.getGenresList().subscribe(response => {
      response.genres.forEach(elem => {
        this.genres.set(elem.id, elem.name);
      })
    })

  }

}
