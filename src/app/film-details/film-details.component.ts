import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { switchMap, catchError } from 'rxjs/operators'
import { of } from 'rxjs'

import { DatabaseAPIService } from '../database-api.service';
import { LocalstorageApiService } from '../localstorage-api.service'


@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.sass']
})
export class FilmDetailsComponent implements OnInit {
  id: number;
  url: string;
  title: string;
  genres: string[] = [];
  overview: string;
  tagline: string;
  budget: number;
  revenue: number;
  inFavorites: boolean;
  recommendations;


  constructor(private route: ActivatedRoute, private databaseApi: DatabaseAPIService, private localstorageApi: LocalstorageApiService) { }

  isInFavorite() {
    this.inFavorites = this.localstorageApi.isInFavorite(this.id);
    return this.inFavorites;
  }

  toggleFavorite() {
    this.inFavorites = !this.inFavorites;
    this.localstorageApi.toggleFavorite(this.id);
  }

  requestFilmInfo() {
    this.databaseApi.getFilmInfo(this.id).subscribe(response => {
      this.url = 'http://image.tmdb.org/t/p/w500' + response.poster_path;
      this.title = response.title;
      this.tagline = response.tagline;
      this.budget = response.budget;
      this.revenue = response.revenue;
      response.genres.forEach(genre => this.genres.push(genre.name));
      this.overview = response.overview;
    }, err => console.log(err));
  }

  requestRecommendations() {
    this.databaseApi.getRecommendations(this.id).subscribe(response => {
      this.recommendations = response.results
    }, err => console.log(err));
  }

  updateContent(id) {
    this.id = id;
    this.genres = [];

    this.requestFilmInfo();
    this.requestRecommendations();
  }

  ngOnInit(): void {

    const obs$ = this.route.paramMap.pipe(
      switchMap(params => params.getAll('filmId')),
      catchError(error => {
        console.log('error: ', error);
        return of(error);
      })
    )
    obs$.subscribe(data => {
      data => this.id = +data
      this.id = +data
    });

    this.requestFilmInfo();
    this.requestRecommendations();
  }

}

