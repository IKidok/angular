import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IHero } from '../hero';
import { HeroService } from '../hero.service';



@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.scss' ]
})
export class HeroSearchComponent  {
  heroes: IHero[];
  heroFilter: any = { name: '' };
  constructor(private  heroService: HeroService) { }

  getHeroes(): void {
    this.heroService.searchHeroes(this.heroFilter.name)
      .subscribe(heroes => this.heroes = heroes);
  }

  onKey(event: any) {
    this.getHeroes();
  }
}
