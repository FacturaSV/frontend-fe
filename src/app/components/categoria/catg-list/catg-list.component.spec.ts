import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatgListComponent } from './catg-list.component';

describe('CatgListComponent', () => {
  let component: CatgListComponent;
  let fixture: ComponentFixture<CatgListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatgListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatgListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
