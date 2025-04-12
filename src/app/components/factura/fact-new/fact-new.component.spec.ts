import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactNewComponent } from './fact-new.component';

describe('FactNewComponent', () => {
  let component: FactNewComponent;
  let fixture: ComponentFixture<FactNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
