import { Component, OnInit } from '@angular/core';
import { IHero } from '../hero';
import { HeroService } from '../hero.service';
import { MatDialog} from '@angular/material';
import { HeroDialogExampleComponent } from '../hero-dialog-example/hero-dialog-example.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  heroes: IHero[] = [];
  temp: IHero[] = [];

  constructor(
    private heroService: HeroService,
    public  dialog: MatDialog) { }

  openDialog(): void {
    this.dialog.open(HeroDialogExampleComponent, {width: '300px', disableClose: true, hasBackdrop: true, data: {}});
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        this.temp = heroes.sort((a, b) => b.level - a.level );
        this.heroes = this.temp.slice(0, 5);
      });
  }
}
