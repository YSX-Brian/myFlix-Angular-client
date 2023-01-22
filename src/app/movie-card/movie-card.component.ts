import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getMovies(),
      this.getFavoriteMovies()
  }

  /**
   * get all movies from API OnInit
   * @returns array holding movies objects
   * @function getMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * get the favorite movies of the current user
   * @returns array with movie IDs
   * @function getFavoriteMovies
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
    });
  }

  /**
  * Opens genre information from GenreComponent in a dialog
  * @param {Movie} movie
  * @function openGenreDialog
  */
  openGenreDialog(movie: any): void {
    const { Name, Description } = movie.Genre;
    this.dialog.open(GenreViewComponent, {
      data: { Name, Description },
      panelClass: "genre-dialog-background",
      width: "400px",
    });
  }

  /**
   * Opens director information from DirectorComponent in a dialog
   * @param {Movie} movie
   * @function openDirectorDialog
   */
  openDirectorDialog(movie: any): void {
    const { Name, Birth, Bio } = movie.Director;
    this.dialog.open(DirectorViewComponent, {
      data: { Name, Birth, Bio },
      panelClass: "director-dialog-background",
      width: "400px",
    });
  }

  /**
   * Add a movie to a user's favorites list
   * @param {string} movieId
   * @function addFavoriteMovie
   */
  addFavoriteMovie(movieId: string): void {
    this.fetchApiData.addFavorite(movieId).subscribe((resp: any) => {
      this.getFavoriteMovies();
    });
  }

  /**
   * Removes a movie from a user's favorites list
   * @param {string} movieId
   * @function deleteFavoriteMovie
   */
  deleteFavoriteMovie(movieId: string): void {
    this.fetchApiData.deleteFavorite(movieId).subscribe((resp: any) => {
      this.getFavoriteMovies();
    });
  }

  /**
   * Checks if a movie is in the user's favorites list
   * @param {string} movieId
   * @returns boolean
   * @function movieIsFavorite
   */
  movieIsFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  /**
   * adds or removes a movie from the user's favorites list based on the result of movieIsFavorite
   * @param {string} movieId
   * @function toggleFavorite
   */
  toggleFavorite(movieId: string): void {
    if (this.movieIsFavorite(movieId)) {
      this.deleteFavoriteMovie(movieId);
    } else {
      this.addFavoriteMovie(movieId);
    }
  }

  /**
   * Opens movie details from MovieDetailsComponent in a dialog
   * @param {Movie} movie
   * @function openMovieDetails
   */
  openMovieDetails(movie: any): void {
    const { Title, Description } = movie;
    this.dialog.open(MovieSynopsisComponent, {
      data: { Title, Description },
      panelClass: "synopsis-dialog-background",
      width: "400px",
    });
  }

  /**
  * route to profile via button click
  * @function goToProfile
  */
  goToProfile(): void {
    this.router.navigate(["profile"]);
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