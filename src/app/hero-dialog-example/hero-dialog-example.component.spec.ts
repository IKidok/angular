import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDialogExampleComponent } from './hero-dialog-example.component';

describe('HeroDialogExampleComponent', () => {
  let component: HeroDialogExampleComponent;
  let fixture: ComponentFixture<HeroDialogExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroDialogExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDialogExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
