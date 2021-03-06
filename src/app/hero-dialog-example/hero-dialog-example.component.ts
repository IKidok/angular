import { Component, Inject } from '@angular/core';
import { IHero } from '../hero';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { HeroService} from '../hero.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-hero-dialog-example',
  templateUrl: './hero-dialog-example.component.html',
  styleUrls: ['./hero-dialog-example.component.scss']
})
export class HeroDialogExampleComponent {

  hero: IHero;
  public addHero: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<HeroDialogExampleComponent>,
    public heroService: HeroService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.addHero = new FormGroup({
      name: new FormControl(this.data.name ? this.data.name : Math.round(Math.random() * 1000),
        [Validators.required, Validators.pattern('[A-Za-zА-Яа-я]+')]),
      level: new FormControl(this.data.level ? this.data.level : 1,
        [Validators.required, Validators.pattern('[0-9]+')]),
      classGroup: new FormControl(this.data.classGroup ? this.data.classGroup : '',
        [Validators.required, Validators.pattern('[A-Za-zА-Яа-я]+')]),
      fraction: new FormControl(this.data.fraction ? this.data.fraction : '', Validators.pattern('[A-Za-zА-Яа-я]+')),
      dateOfBirth: new FormControl(this.data.dateOfBirth ? this.data.dateOfBirth : '', Validators.required),
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  onAdd() {
    this.hero = this.addHero.getRawValue();
    this.hero.level = Number(this.hero.level);
    this.heroService.addHero(this.hero).subscribe(
      () => {
        this.close();
        this.openSnackBar('Success', 'adding hero');
      },
      error => {
        this.openSnackBar(error.error, 'adding Hero');
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  onChange() {
    this.hero = this.addHero.getRawValue();
    this.hero._id = this.data._id;
    this.hero.level = Number(this.hero.level);
    this.heroService.updateHero(this.hero).subscribe(() => {
      this.openSnackBar('Success', 'changing hero');
      this.close();
    },
        error => this.openSnackBar(error.error, 'changing Hero'));
  }
}
