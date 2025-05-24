import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { GifsList } from 'src/app/models/gifs.interface';

import { GiphyService } from 'src/app/services/giphy.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

type View = 'card' | 'list';
@Component({
  selector: 'app-gifs-list',
  templateUrl: './gifs-list.component.html',
  styleUrls: ['./gifs-list.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class GifsListComponent implements OnInit {
  errorMessage: string = '';
  searchControl = new FormControl('');
  gifsList: GifsList = [];
  view: View = 'card';
  isLoading$ = this.spinnerService.loading$;
  categorySelected: string | null = null;
  categories: string[] = [
    'Películas',
    'Divertido',
    'Deportes',
    'Animales',
    'Viajes',
    'Musica',
    'Comida',
  ];

  constructor(
    private gifsService: GiphyService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    //por defecto se cargan los trending gifs
    this.getByDefault();
    //en caso de buscar un gif
    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query) => {
          if (query && query.length > 2) {
            this.categorySelected = null;
            return this.gifsService.searchGifs(query).pipe(
              catchError((error) => {
                this.errorMessage = `Ha ocurrido un error al cargar los gifs. ${error.error.meta.msg}`;
                console.error(error.error.meta.msg);
                return of({ data: [] });
              })
            );
          } else {
            return this.gifsService.getTrendingGifs().pipe(
              catchError((error) => {
                this.errorMessage = `Ha ocurrido un error al cargar los gifs -> "${error.error.meta.msg}"`;
                console.error(error.error.meta.msg);
                return of({ data: [] });
              })
            );
          }
        })
      )

      .subscribe((response) => {
        this.gifsList = response.data;
      });
  }

  getByDefault() {
    this.gifsService
      .getTrendingGifs()
      .pipe(
        catchError((error) => {
          this.errorMessage = `Ha ocurrido un error al cargar los gifs. ${error.error.meta.msg}`;
          console.error(error.error.meta.msg);
          return of({ data: [] });
        })
      )
      .subscribe((response) => {
        console.log(response.data);
        this.gifsList = response.data;
        console.log(this.gifsList);
      });
  }
  buscarCategoria(categoria: string, seleccionado: boolean) {
    //si seleccionamos una categoría
    if (seleccionado) {
      this.categorySelected = categoria;
      this.gifsService
        .searchGifs(categoria)
        .pipe(
          catchError((error) => {
            this.errorMessage = `Ha ocurrido un error al cargar los gifs. ${error.error.meta.msg}`;
            console.error(error.error.meta.msg);
            return of({ data: [] });
          })
        )
        .subscribe((response) => {
          this.gifsList = response.data;
        });
      this.searchControl.setValue('', { emitEvent: false });
    } else {
      //si deseleccionamos la categoría
      this.categorySelected = null;
      this.getByDefault();
    }
  }
}
