import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliFormComponent } from './cli-form.component';

describe('CliFormComponent', () => {
  let component: CliFormComponent;
  let fixture: ComponentFixture<CliFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CliFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CliFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
