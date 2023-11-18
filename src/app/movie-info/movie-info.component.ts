/**
 * @fileoverview
 * @module app/movie-info
 * @description This module contains the MovieInfoComponent.
 */

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @classdesc
 * MovieInfoComponent represents a dialog component for displaying movie information.
 * @class
 */
@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css'],
})
export class MovieInfoComponent implements OnInit {
  /**
   * @constructor
   * @param {Object} data - The data object injected into the component.
   * @param {string} data.Title - The title of the movie.
   * @param {string} data.Description - The description or details of the movie.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
      Description: string;
    }
  ) {}
  // Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
  ngOnInit(): void {}
}
