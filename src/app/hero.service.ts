import {Injectable} from '@angular/core';
import {Hero} from './hero';
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

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.getAllHeroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: any): Observable<Hero> {
    return this.http.get<Hero>(this.getHeroUrl(id)).pipe(
      tap(_ => this.log(`fetched hero = ${_.name}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    console.log(hero);
    return this.http.put(this.updateHeroUrl(hero._id), hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero =${hero.name}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post<Hero>(this.createHeroUrl, hero, httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero =${newHero.name}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(hero: Hero ): Observable<Hero> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    const id = typeof hero === 'string' ? hero : hero._id;
    console.log(id);
    return this.http.delete<Hero>(this.deleteHeroUrl(id), httpOptions).pipe(
      tap(_ => this.log(`deleted hero =${ hero.name}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(this.searchHeroesUrl(term)).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
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
