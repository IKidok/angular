import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';



@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.scss' ]
})
export class HeroSearchComponent  {
  heroes: Hero[];
  heroFilter: any = { name: '' };
  constructor(private  heroService: HeroService) { }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  onKey(event: any) {
    this.getHeroes();
  }
}
