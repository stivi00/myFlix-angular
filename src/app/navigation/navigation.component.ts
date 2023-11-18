/**
 * @fileoverview
 * @module app/navigation
 * @description This module contains the NavigationComponent.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * @classdesc
 * NavigationComponent represents a component for navigating between different views.
 * @class
 */
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  /**
   * @constructor
   * @param {Router} router - The Angular Router service for navigation.
   */
  constructor(private router: Router) {}

  ngOnInit(): void {}

  /**
   * @method
   * @description Navigates to the 'movies' route.
   * @returns {void}
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * @method
   * @description Navigates to the 'profile' route.
   * @returns {void}
   */
  toProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * @method
   * @description Navigates to the 'welcome' route and clears local storage.
   * @returns {void}
   */
  toLogout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}
