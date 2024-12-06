import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecoffeeformComponent } from './updatecoffeeform.component';

describe('UpdatecoffeeformComponent', () => {
  let component: UpdatecoffeeformComponent;
  let fixture: ComponentFixture<UpdatecoffeeformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatecoffeeformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatecoffeeformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
