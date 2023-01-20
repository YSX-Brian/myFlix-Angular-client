// import { Component } from '@angular/core';

// import { MatDialog } from '@angular/material/dialog';
// import { MovieCardComponent } from './movie-card/movie-card.component';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//   title = 'myFlix-Angular-client';

//   constructor(public dialog: MatDialog) { }
//   // This is the function that will open the dialog when the signup button is clicked  

//   openMoviesDialog(): void {
//     this.dialog.open(MovieCardComponent, {
//       width: '500px'
//     });
//   }

// }

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'myFlix-Angular-client';
}