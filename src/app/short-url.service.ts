import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { urlsArr } from 'src/assets/shared/urlsArr';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShortUrlService {

  apiUrl = 'https://api.shrtco.de/v2/shorten?url=';

  constructor(private http: HttpClient) { }

  errorHandle(){

  }

  getShortUrl(inputUrl: string):Observable<urlsArr> {
    return this.http
      .get<urlsArr>(`${this.apiUrl}${inputUrl}`)
      /* */
      .pipe(
        catchError((err: HttpErrorResponse | any) => {
          let errMsg: string='';

          if (err.error instanceof ErrorEvent) {
            errMsg = err.error;
          } else {
            errMsg = `${err.statusText || ''}`;
          }
          return throwError(errMsg)
        })
      )
  }

}

