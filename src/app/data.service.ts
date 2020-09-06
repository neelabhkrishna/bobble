import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private extractData(res: Response) {
    let body = res;
    return body || { };
  
  }

  constructor(private http: HttpClient) {}
  public postdata(data: any) : Observable<any>{
    //return this.http.post('https://reqres.in/api/register', data).pipe(retry(3),catchError(this.handleError));;
   return this.http.post('https://reqres.in/api/register', data).pipe(
      map(this.extractData) );
  
    }
    handleError(error: HttpErrorResponse) {
      let errorMessage = 'Unknown error!';
      if (error.error instanceof ErrorEvent) {
        // Client-side errors - Like Type error , network error , ErrorEvent is used for client side
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side errors
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(errorMessage);
      return throwError(errorMessage);
    }
  
  }
  
  
