import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcoffeeformComponent } from './addcoffeeform.component';

describe('AddcoffeeformComponent', () => {
  let component: AddcoffeeformComponent;
  let fixture: ComponentFixture<AddcoffeeformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddcoffeeformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcoffeeformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
