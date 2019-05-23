import { IHero } from '../hero';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { MatDialog} from '@angular/material';
import { HeroDialogExampleComponent } from '../hero-dialog-example/hero-dialog-example.component';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: IHero;
  age: number | Date;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    public  dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  calcAge(): void {
    this.hero.dateOfBirth = new Date(this.hero.dateOfBirth);
    this.age = (new Date()).getFullYear() - this.hero.dateOfBirth.getFullYear();
  }

  getHero(): void {
    let id = '';
    this.route.params.subscribe(params => { id = params['id']; });
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero;
        this.calcAge();
      });

  }

  goBack(): void {
    this.location.back();
  }

  onChange(): void {
    this.dialog.open(HeroDialogExampleComponent, {width: '300px', hasBackdrop: true, data: this.hero});
    this.dialog.afterAllClosed.subscribe(() => {
      this.getHero();
    });
  }

}
