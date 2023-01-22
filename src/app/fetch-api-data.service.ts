import { Injectable } from '@angular/core';
import { catchError } from "rxjs";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflix17507.herokuapp.com';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  /**
  * @service POST and register a new user
  * @param {any} userDetails
  * @returns user object in JSON
  * @function userRegistration
  */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(`${apiUrl}/users`, userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Error handler
   * @param error
   * @returns error message
   * @function handleError
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Unable to login or register. Please try again.');
  }

  /**
   * @service POST and login a user
   * @param {any} userDetails
   * @returns user object in JSON
   * @function userLogin
   */
  userLogin(userDetails: any): Observable<any> {
    //console.log(userDetails);
    return this.http
      .post(`${apiUrl}/login`, userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * @service GET all movies 
   * @returns an array with movie objects in JSON
   * @function getAllMovies
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get(`${apiUrl}/movies`,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service GET a movie by title
   * @param {string} title
   * @returns a movie object in JSON
   * @function getOneMovie
   */
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get(`${apiUrl}/movies/${title}`,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service GET director info
   * @param {string} directorName
   * @returns a director object in JSON
   * @function getDirector
   */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get(`${apiUrl}/movies/directors/${directorName}`,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service GET genre info
   * @param {string} genreName
   * @returns a genre object in JSON
   * @function getGenre
   */
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get(`${apiUrl}/movies/genre/${genreName}`,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service GET a user by username
   * @returns a user object in JSON
   * @function getUser
   */
  getUser(): Observable<any> {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    return this.http.get(`${apiUrl}/users/${username}`,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
  * @service GET a user's favorite movies
  * @returns an array of movie ids in JSON
  * @function getFavoriteMovies
  */
  getFavoriteMovies(): Observable<any> {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    return this.http
      .get(`${apiUrl}/users/${username}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        map((data) => data.FavoriteMovies),
        catchError(this.handleError)
      );
  }

  /**
   * @service POST and add a movie to the favorites list
   * @returns a user object in JSON
   * @function addFavorite
   */
  addFavorite(movieId: string): Observable<any> {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    return this.http
      .post(`${apiUrl}/users/${username}/movies/${movieId}`,
        { FavoriteMovie: movieId },
        {
          headers: new HttpHeaders({
            Authorization: "Bearer " + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service PUT and change a user's information
   * @returns a user object in JSON
   * @function editUser
   */
  editUser(updatedUser: any): Observable<any> {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    return this.http.put(`${apiUrl}/users/${username}`, updatedUser,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service DELETE or deregister a user
   * @returns success message
   * @function deleteUser
   */
  deleteUser(): Observable<any> {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    return this.http.delete(`${apiUrl}/users/${username}`,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service DELETE a movie from the favorites list
   * @returns a user object in JSON
   * @function deleteFavorite
   */

  deleteFavorite(movieId: string): Observable<any> {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    return this.http
      .delete(`${apiUrl}/users/${username}/movies/${movieId}`,
        {
          headers: new HttpHeaders({
            Authorization: "Bearer " + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Extracts response data from HTTP response
   * @param res
   * @returns response body or empty object
   * @function extractResponseData
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

}