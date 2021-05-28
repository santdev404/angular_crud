import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { MovieComponent } from './movie/movie.component';
import { MoviesComponent } from './movies/movies.component';

const routes: Routes = [
  {path: 'movies', component: MoviesComponent},
  {path: 'movie/:id', component: MovieComponent},
  {path: 'movie-form/:id', component: MovieFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
