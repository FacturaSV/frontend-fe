import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucFormComponent } from './suc-form.component';

describe('SucFormComponent', () => {
  let component: SucFormComponent;
  let fixture: ComponentFixture<SucFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SucFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SucFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
