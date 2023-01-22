import { Component, Input, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  initialInput: any = {};
  @Input() updatedUser = {
    Username: "",
    Password: "",
    Email: "",
    Birthday: "",
  };

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  /**
   * Fetch user data onInit
   * @returns object with username, email, birthday
   * @function getUserInfo
   */
  getUserInfo(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.updatedUser.Username = this.user.Username;
      this.updatedUser.Email = this.user.Email;
      this.updatedUser.Birthday = this.user.Birthday;
    });
  }

  /**
   * Update username, password, email, or birthday
   * @function updateUserInfo
   */
  updateUserInfo(): void {
    this.fetchApiData.editUser(this.updatedUser).subscribe((result) => {
      console.log(result);
      this.snackBar.open("User profile updated", "OK", {
        duration: 5000,
      });
      if (this.user.Username !== result.Username) {
        localStorage.clear();
        this.router.navigate(["welcome"]);
        this.snackBar.open(
          "User profile successfully updated. Please login using your new credentials.",
          "OK",
          {
            duration: 5000,
          }
        );
      }
    });
  }

  /**
   * Delete user data for the current user
   * @function deleteAccount
   */
  deleteAccount(): void {
    if (confirm("Please confirm account deletion.")) {
      this.router.navigate(["welcome"]).then(() => {
        this.snackBar.open(
          "Account successfully deleted.",
          "OK",
          {
            duration: 5000,
          }
        );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }

  /**
   * route to movies via button click
   * @function goToMovies
   */
  goToMovies(): void {
    this.router.navigate(["movies"]);
  }

  /**
   * log out the current user
   * @function logOut
   */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(["welcome"]);
  }

}

