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

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
    });
  }

  openGenreDialog(movie: any): void {
    const { Name, Description } = movie.Genre;
    this.dialog.open(GenreViewComponent, {
      data: { Name, Description },
      panelClass: "genre-dialog-background",
      width: "400px",
    });
  }

  openDirectorDialog(movie: any): void {
    const { Name, Birth, Bio } = movie.Director;
    this.dialog.open(DirectorViewComponent, {
      data: { Name, Birth, Bio },
      panelClass: "director-dialog-background",
      width: "400px",
    });
  }

  addFavoriteMovie(movieId: string): void {
    this.fetchApiData.addFavorite(movieId).subscribe((resp: any) => {
      this.getFavoriteMovies();
    });
  }

  deleteFavoriteMovie(movieId: string): void {
    this.fetchApiData.deleteFavorite(movieId).subscribe((resp: any) => {
      this.getFavoriteMovies();
    });
  }

  movieIsFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  toggleFavorite(movieId: string): void {
    if (this.movieIsFavorite(movieId)) {
      this.deleteFavoriteMovie(movieId);
    } else {
      this.addFavoriteMovie(movieId);
    }
  }

  openMovieDetails(movie: any): void {
    const { Title, Description } = movie;
    this.dialog.open(MovieSynopsisComponent, {
      data: { Title, Description },
      panelClass: "synopsis-dialog-background",
      width: "400px",
    });
  }

}