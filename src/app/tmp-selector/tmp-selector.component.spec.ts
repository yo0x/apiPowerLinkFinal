import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmpSelectorComponent } from './tmp-selector.component';

describe('TmpSelectorComponent', () => {
  let component: TmpSelectorComponent;
  let fixture: ComponentFixture<TmpSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TmpSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TmpSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
