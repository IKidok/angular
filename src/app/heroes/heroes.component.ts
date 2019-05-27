import { Component, OnInit } from '@angular/core';
import { IHero} from '../hero';
import { HeroService } from '../hero.service';
import {HeroDialogExampleComponent} from '../hero-dialog-example/hero-dialog-example.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})

export class HeroesComponent implements OnInit {

  heroes: IHero[];

  constructor(private heroService: HeroService,
              public dialog: MatDialog) { }

  getHeroes(): void {
   this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  openDialog(): void {
    this.dialog.open(HeroDialogExampleComponent, {width: '300px', data: {}});
    this.dialog.afterAllClosed.subscribe(() => this.getHeroes() );
  }

  ngOnInit() {
    this.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as IHero)
      .subscribe(hero => {
        this.heroes.push(hero);
        this.heroService.getHeroes().subscribe( heroes => this.heroes = heroes);
      });

  }

  remove(hero: IHero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
