import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { IHero} from '../hero';
import { HeroService } from '../hero.service';
import { Observable, of} from 'rxjs';

@Component({
  selector: 'app-table-heroes',
  templateUrl: './table-heroes.component.html',
  styleUrls: ['./table-heroes.component.scss']
})

export class TableHeroesComponent implements OnInit {

  heroes: IHero[];
  columnsToDisplay: string[] = ['name', 'level', 'classGroup', 'fraction', 'dateOfBirth'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private heroService: HeroService) { }

  getHeroes(): Observable<IHero[]> {
    return this.heroService.getHeroes();
  }

  ngOnInit() {
    this.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
      this.dataSource = new MatTableDataSource<IHero>(this.heroes);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

}
