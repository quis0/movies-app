import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { DatabaseAPIService } from '../database-api.service';

import { searchResults } from '../results';
import { DialogSearchComponent } from '../dialog-search/dialog-search.component';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.sass']
})
export class TopBarComponent implements OnInit {
  searchResults = searchResults;

  constructor(private router: Router, private databaseApi: DatabaseAPIService, public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(DialogSearchComponent);
  }

  find(search) {
    search = search;
    if (search.value !== '') {
      const value = search.value;
      search.value = '';
      const encodedValue = encodeURI(value);
      this.databaseApi.setSearchValue(encodedValue);
      this.router.navigateByUrl(`searchresults/${encodedValue}`)
      this.databaseApi.getSearchResults().subscribe(response => {
        this.searchResults.length = 0;
        response.results.forEach(elem => this.searchResults.push(elem));
      }, err => console.log(err));
    }
  }

  ngOnInit(): void {

  }

}
