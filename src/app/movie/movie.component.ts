import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../models/Movie';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  public movie$: Promise<Movie> | undefined
  constructor(
    private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie = async() => {
    let routeParamId: string | number | null = this.activatedRoute.snapshot!.paramMap.get("id");
    if (routeParamId){
      routeParamId = parseInt(routeParamId);
      this.movie$ = this.moviesService.getMovieById(routeParamId);
    }
  }

}
