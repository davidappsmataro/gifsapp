import { TestBed } from '@angular/core/testing';

import { GiphyApiInterceptor } from './giphy-api.interceptor';

describe('GiphyApiInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GiphyApiInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: GiphyApiInterceptor = TestBed.inject(GiphyApiInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
