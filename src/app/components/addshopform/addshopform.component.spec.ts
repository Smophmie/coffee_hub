import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddshopformComponent } from './addshopform.component';

describe('AddshopformComponent', () => {
  let component: AddshopformComponent;
  let fixture: ComponentFixture<AddshopformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddshopformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddshopformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
