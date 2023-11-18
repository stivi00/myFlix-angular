/**
 * @fileoverview
 * @module app/user-registration-form
 * @description This module contains the UserRegistrationFormComponent.
 */
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @classdesc
 * UserRegistrationFormComponent represents a component for user registration.
 * @class
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.css'],
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * @member {Object} userData - Object to store user registration data received as input.
   * @property {string} Username - The username for user registration.
   * @property {string} Password - The password for user registration.
   * @property {string} Email - The email for user registration.
   * @property {string} Birthday - The birthday for user registration.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * @constructor
   * @param {FetchApiDataService} fetchApiData - Service for fetching API data.
   * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - Reference to the dialog component.
   * @param {MatSnackBar} snackBar - Service for displaying snack bar notifications.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * @method
   * @description Registers the user and performs necessary actions based on the result.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
