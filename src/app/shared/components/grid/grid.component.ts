import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Gif } from 'src/app/models/gifs.interface';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  
})
export class GridComponent {
   @Input() gifs: Gif[]=[];
    displayedColumns: string[] = ['image', 'title', 'username'];

}
