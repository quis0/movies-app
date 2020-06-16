import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { DatabaseAPIService } from '../database-api.service';
import { LocalstorageApiService } from '../localstorage-api.service'

import { genres } from '../genres';


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.sass']
})
export class MainContentComponent implements OnInit {
  displayedColumns: string[] = ["poster_path", "title", "genre_ids", "inFavorites"];
  dataSource = new MatTableDataSource<Films>();
  genres = genres

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  isInFavorite(movie) {
    movie.inFavorites = this.localstorageApi.isInFavorite(movie.id);
    return movie.inFavorites;
  }

  toggleFavorite(film) {
    film.inFavorites = !film.inFavorites;
    this.localstorageApi.toggleFavorite(film.id);
  }

  constructor(private databaseApi: DatabaseAPIService, private localstorageApi: LocalstorageApiService) { }

  ngOnInit(): void {
    this.databaseApi.getGenresList().subscribe(response => {
      response.genres.forEach(elem => {
        this.genres.set(elem.id, elem.name);
      })
    })

    this.databaseApi.getPopularFilmsData().subscribe(response => {
      let arr = [];

      for (let key in response) {
        arr = arr.concat(response[key].results);
      }
      this.dataSource.data = arr;
      this.dataSource.paginator = this.paginator;
    }, err => console.log(err))


  }

}

export interface Films {
  poster_path: string;
  title: string;
  genre_ids: string[];
  id: number;
}


