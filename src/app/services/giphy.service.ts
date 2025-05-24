import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GifResponse, GifsResponse } from '../models/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  private urlApiGiphy = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {}

  getTrendingGifs(
    limit: number = 25,
    offset: number = 0
  ): Observable<GifsResponse> {
    return this.http.get<GifsResponse>(this.urlApiGiphy + '/trending', {
      params: {
        limit: limit.toString(),
        offset: offset.toString(),
      },
    });
  }
  searchGifs(
    query: string,
    limit: number = 25,
    offset: number = 0
  ): Observable<GifsResponse> {
    return this.http.get<GifsResponse>(this.urlApiGiphy + '/search', {
      params: {
        q: query,
        limit: limit.toString(),
        offset: offset.toString(),
      },
    });
  }
  getGifById(id: string): Observable<GifResponse> {
    return this.http.get<GifResponse>(this.urlApiGiphy + '/' + id);
  }
}
