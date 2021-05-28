import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../models/Movie';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  public movieForm: FormGroup;
  public movie: Movie | undefined;
  public isEditing: boolean = false;
  private routeParamId: string | number | null = 0;

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MoviesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) { 
    this.movieForm = this.formBuilder.group({
      title: ['', Validators.required],
      year: ['', Validators.required],
      cover: [''],
      synopsis: ['Cadena', [Validators.required, Validators.minLength(15)]],
    });
  }

  ngOnInit(): void {
    this.getMovie();
  }

  
  onSubmit = (form: FormGroup) =>{
    console.log(form.valid);
    console.log(form.value);

    if(form.valid){

      const call = (this.isEditing) 
      ? this.movieService.updateMovie(this.routeParamId, form.value)
      : this.movieService.createMovie(form.value);


      call.then(res=>{
        console.log(res);
        alert('Guardado con exito');
        this.router.navigateByUrl('/movies');
      }).catch(err =>{
        alert('ocurrio un error');
      })
    }

  }

  getMovie = () => {
    this.routeParamId = this.activatedRoute.snapshot!.paramMap.get('id');
    if(this.routeParamId){
      this.routeParamId = parseInt(this.routeParamId);
      if(this.routeParamId == 0){
        this.isEditing = false;
        return;
      }
      this.isEditing = true;
      this.movieService.getMovieById(this.routeParamId).then(res =>{
        this.movieForm.setValue({
          title: res.title,
          year: res.year,
          synopsis: res.synopsis,
          cover: res.cover
        });
        console.log(res);
      }).catch(err =>{
        alert('Ocurrio un error');
        console.log(err);
      });
    }
  }

}
