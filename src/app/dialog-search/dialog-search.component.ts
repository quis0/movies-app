import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import { DatabaseAPIService } from '../database-api.service';

import { searchResults } from '../results';

@Component({
  selector: 'app-dialog-search',
  templateUrl: './dialog-search.component.html',
  styleUrls: ['./dialog-search.component.sass']
})
export class DialogSearchComponent implements OnInit {
  searchResults = searchResults;
  search = new FormControl('', [Validators.required]);
  constructor(private router: Router, private databaseApi: DatabaseAPIService, public dialog: MatDialog) { }

  closeDialog() {
    this.dialog.closeAll()
  }

  getErrorMessage() {
    if (this.search.hasError('required')) {
      return 'You must enter a value';
    }

    return 'Минимальное количество символов для поиска 2';
  }

  find(search) {
    search = search;
    if (search.value !== '') {
      this.searchResults.length = 0;
      const value = search.value;
      search.value = '';
      const encodedValue = encodeURI(value);
      this.databaseApi.setSearchValue(encodedValue);
      this.router.navigateByUrl(`searchresults/${encodedValue}`)
      this.databaseApi.getSearchResults().subscribe(response => {
        response.results.forEach(elem => this.searchResults.push(elem));
      }, err => console.log(err));

    }
    this.closeDialog();
  }

  ngOnInit(): void {
  }

}
