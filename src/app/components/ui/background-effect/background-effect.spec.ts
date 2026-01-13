import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundEffect } from './background-effect';

describe('BackgroundEffect', () => {
  let component: BackgroundEffect;
  let fixture: ComponentFixture<BackgroundEffect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundEffect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgroundEffect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
