import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliEditComponent } from './cli-edit.component';

describe('CliEditComponent', () => {
  let component: CliEditComponent;
  let fixture: ComponentFixture<CliEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CliEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CliEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
