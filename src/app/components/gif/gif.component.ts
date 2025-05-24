import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gif } from 'src/app/models/gifs.interface';
import { GiphyService } from 'src/app/services/giphy.service';

@Component({
  selector: 'app-gif',
  templateUrl: './gif.component.html',
  styleUrls: ['./gif.component.css'],
})
export class GifComponent implements OnInit {
  gif: Gif | null = null;
  panelOpenState = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private gifService: GiphyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const gifId = params['id'];
      if (gifId) {
        this.gifService.getGifById(gifId).subscribe((response) => {
          this.gif = response.data;
        });
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
