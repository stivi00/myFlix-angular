/**
 * @fileoverview
 * @module app/profile-view
 * @description This module contains the ProfileViewComponent.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * @classdesc
 * ProfileViewComponent represents a component for viewing and managing user profile information.
 * @class
 */
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css'],
})
export class ProfileViewComponent implements OnInit {
  user: any = {};

  favoriteMovies: any[] = [];

  /**
   * @member {Object} userData - Object to store user data received as input.
   * @property {string} Name - The name of the user.
   * @property {string} Username - The username of the user.
   * @property {string} Password - The password of the user.
   * @property {string} Email - The email of the user.
   * @property {string} Birthday - The birthday of the user.
   */
  @Input() userData = {
    Name: '',
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  /**
   * @constructor
   * @param {FetchApiDataService} fetchApiData - Service for fetching API data.
   * @param {MatSnackBar} snackBar - Service for displaying snack bar notifications.
   * @param {Router} router - Angular Router service for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * @method
   * @description Fetches user data and favorite movies when the component is loaded.
   */
  getUser(): void {
    this.fetchApiData.getOneUser().subscribe((response: any) => {
      this.user = response;
      this.userData.Username = this.user.Username;
      this.userData.Email = this.user.Email;

      this.fetchApiData.getAllMovies().subscribe((response: any) => {
        this.favoriteMovies = response.filter(
          (m: { _id: any }) => this.user.FavoriteMovies.indexOf(m._id) >= 0
        );
      });
    });
  }

  /**
   * @method
   * @description Edits user information and updates local storage.
   */
  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (data) => {
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('Username', data.Username);
        console.log('user updated', data);
        this.snackBar.open('User has been updated', 'OK', {
          duration: 2000,
        });
        window.location.reload();
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }

  /**
   * @method
   * @description Deletes the user account and navigates to the welcome screen.
   */
  deleteUser(): void {
    if (confirm('are you sure?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('You have successfully deleted your account', 'OK', {
          duration: 2000,
        });
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        localStorage.clear();
      });
    }
  }
}
