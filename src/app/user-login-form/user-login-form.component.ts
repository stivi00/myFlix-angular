/**
 * @fileoverview
 * @module app/user-login-form
 * @description This module contains the UserLoginFormComponent.
 */

import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * @classdesc
 * UserLoginFormComponent represents a component for user login.
 * @class
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css'],
})
export class UserLoginFormComponent implements OnInit {
  /**
   * @member {Object} userData - Object to store user login data received as input.
   * @property {string} Username - The username of the user.
   * @property {string} Password - The password of the user.
   */
  @Input() userData = { Username: '', Password: '' };

  /**
   * @constructor
   * @param {FetchApiDataService} fetchApiData - Service for fetching API data.
   * @param {MatDialogRef<UserLoginFormComponent>} dialogRef - Reference to the dialog component.
   * @param {MatSnackBar} snackBar - Service for displaying snack bar notifications.
   * @param {Router} router - Angular Router service for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * @method
   * @description Logs in the user and performs necessary actions based on the result.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
