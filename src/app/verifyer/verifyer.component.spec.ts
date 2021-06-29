import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyerComponent } from './verifyer.component';

describe('VerifyerComponent', () => {
  let component: VerifyerComponent;
  let fixture: ComponentFixture<VerifyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
