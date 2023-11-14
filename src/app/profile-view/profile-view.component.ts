import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css'],
})
export class ProfileViewComponent implements OnInit {
  user: any = {};

  favoriteMovies: any[] = [];

  @Input() userData = {
    Name: '',
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  //when loading component get all user data and favorite movies list
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

  // this will edit the user information
  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (data) => {
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('Username', data.Username);
        // console.log(data);
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

  // deleting the user account will permanently erase the acount and return to the welcome screen
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
