import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatgFormComponent } from './catg-form.component';

describe('CatgFormComponent', () => {
  let component: CatgFormComponent;
  let fixture: ComponentFixture<CatgFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatgFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatgFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
