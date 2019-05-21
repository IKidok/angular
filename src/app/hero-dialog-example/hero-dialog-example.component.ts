import { Component, Inject } from '@angular/core';
import { IHero } from '../hero';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.addHero = new FormGroup({
      name: new FormControl(Math.round(Math.random() * 1000), Validators.required),
      level: new FormControl(1, [Validators.required, Validators.pattern('[0-9]+')]),
      classGroup: new FormControl('', Validators.required),
      fraction: new FormControl(),
      dateOfBirth: new FormControl('', Validators.required)
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAdd() {
    this.hero = this.addHero.getRawValue();
    this.heroService.addHero(this.hero).subscribe();
    this.dialogRef.close();
  }
}
