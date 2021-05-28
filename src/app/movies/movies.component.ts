import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/Movie';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  public movies$: Promise<Movie[]> | undefined;
  constructor(
    private moviesService: MoviesService
  ) { }

  ngOnInit(): void {

      this.getMovies();
      

  }


  deleteMovie= (id: number | undefined) => {
    if(confirm('Are you sure?')){
      this.moviesService.deleteMovieById(id).
      then(response => {
        alert('Eliminado con exito');
      }).catch(err =>{
        alert('Eliminado con exito');
        console.log(err);
      }).finally(() => this.getMovies())
    }
  }


  getMovies = () =>{
    this.movies$ = this.moviesService.getAllMovies();
    console.log(this.movies$);
  }

}
