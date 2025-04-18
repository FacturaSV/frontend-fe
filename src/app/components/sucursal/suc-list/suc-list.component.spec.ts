import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucListComponent } from './suc-list.component';

describe('SucListComponent', () => {
  let component: SucListComponent;
  let fixture: ComponentFixture<SucListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SucListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SucListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
