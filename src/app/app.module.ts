import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { FavoritePageComponent } from './favorite-page/favorite-page.component';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { SearchResultsComponent } from './search-results/search-results.component';

import { MatButtonModule, } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogSearchComponent } from './dialog-search/dialog-search.component';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    MainContentComponent,
    FavoritePageComponent,
    FilmDetailsComponent,
    SearchResultsComponent,
    DialogSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: MainContentComponent },
      { path: 'favorites', component: FavoritePageComponent },
      { path: 'films/:filmId', component: FilmDetailsComponent },
      { path: 'searchresults/:value', component: SearchResultsComponent }
    ]),

    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatMenuModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogSearchComponent]
})
export class AppModule { }
