import { IHero } from '../hero';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: IHero;
  age: number;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    let id = '';
    this.route.params.subscribe(params => { id = params['id']; });
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero;
        this.hero.dateOfBirth = new Date(this.hero.dateOfBirth);
        this.age = (new Date()).getFullYear() - this.hero.dateOfBirth.getFullYear();
      });

  }

  goBack(): void {
    this.location.back();
  }

  onChange(): void {

  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

}
