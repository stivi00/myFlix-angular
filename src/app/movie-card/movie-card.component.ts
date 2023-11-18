/**
 * @fileoverview
 * @module app/movie-card
 * @description This module contains the MovieCardComponent.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieInfoComponent } from '../movie-info/movie-info.component';

/**
 * @classdesc
 * MovieCardComponent represents a component for displaying movie information and managing favorites.
 * @class
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  /**
   * @constructor
   * @param {FetchApiDataService} fetchApiData - Service for fetching movie data.
   * @param {MatDialog} dialog - Service for displaying dialogs.
   * @param {MatSnackBar} snackBar - Service for displaying snack bar notifications.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  //Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * @method
   * @description Fetches all movies using the FetchApiDataService.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * @method
   * @description Gets information about movie.
   * @param {string} name - Name of the movie.
   * @param {string} description - Description of the movie.
   *
   */
  openMovieInfo(title: string, description: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        Title: title,
        Description: description,
      },
    });
  }

  /**
   * @method
   * @description Gets information about genre.
   * @param {string} name - Name of the genre
   * @param {string} description - Description of the genre.
   * .
   */
  getGenre(name: string, description: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        Title: name,
        Description: description,
      },
    });
  }

  /**
   * @method
   * @description Gets information about director.
   * @param {string} name - Name of the director.
   * @param {string} bio - Short biography of the director.
   *
   */
  getDirector(name: string, bio: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        Title: name,
        Description: bio,
      },
    });
  }

  /**
   * @method
   * @description Adds a movie to favorites.
   * @param {string} id - The ID of the movie to be added to favorites.
   */
  addFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 2000,
      });
    });
  }

  // check if movie is in a list of favorites
  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavorite(id);
  }

  /**
   * @method
   * @description Removes a movie from favorites.
   * @param {string} id - The ID of the movie to be removed from favorites.
   */
  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('Movie is removed from favorites', 'OK', {
        duration: 2000,
      });
    });
  }
}
