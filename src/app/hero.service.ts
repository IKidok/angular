import {Injectable} from '@angular/core';
import {IHero} from './hero';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class HeroService {

  private heroesUrl = 'http://localhost:3000/hero';
  private getAllHeroesUrl = `${this.heroesUrl}/readAll`;
  private createHeroUrl = `${this.heroesUrl}/create`;
  private searchHeroesUrl = (name) => `${this.heroesUrl}/search/${name}`;
  private getHeroUrl = (id) => `${this.heroesUrl}/read/${id}`;
  private deleteHeroUrl = (id) => `${this.heroesUrl}/delete/${id}`;
  private updateHeroUrl = (id) => `${this.heroesUrl}/update/${id}`;

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  getHeroes(): Observable<IHero[]> {
    return this.http.get<IHero[]>(this.getAllHeroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<IHero[]>('getHeroes', []))
      );
  }

  getHero(id: any): Observable<IHero> {
    return this.http.get<IHero>(this.getHeroUrl(id)).pipe(
      tap(_ => this.log(`fetched hero = ${_.name}`)),
      catchError(this.handleError<IHero>(`getHero id=${id}`))
    );
  }

  updateHero(hero: IHero): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(this.updateHeroUrl(hero._id), hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero =${hero.name}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero: IHero): Observable<IHero>  {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post<IHero>(this.createHeroUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`added hero =${hero.name}`)),
      catchError(this.handleError<IHero>('addHero'))
    );
  }

  deleteHero(hero: IHero ): Observable<IHero> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    const id = typeof hero === 'string' ? hero : hero._id;
    return this.http.delete<IHero>(this.deleteHeroUrl(id), httpOptions).pipe(
      tap(_ => this.log(`deleted hero =${ hero.name}`)),
      catchError(this.handleError<IHero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<IHero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<IHero[]>(this.searchHeroesUrl(term)).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<IHero[]>('searchHeroes', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
